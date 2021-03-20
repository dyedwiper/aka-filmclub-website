import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useContext, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import HorizontalLineToolbarButton from '../../common/forms/HorizontalLineToolbarButton';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getText, postText } from '../../utils/services/textServices';
import LoadingPage from '../LoadingPage';

export default function EditTextPage() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [assocPage, setAssocPage] = useState('');
    const [defaultText, setDefaultText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);

    const { pageTitle, setPageTitle } = useContext(Context);

    let history = useHistory();

    const pageTitleMap = {
        about: 'Über uns',
        contact: 'Kontakt',
        links: 'Links',
        press: 'Pressespiegel',
        awards: 'Auszeichnungen',
    };

    useEffect(() => {
        document.title = pageTitleMap[assocPage] + ' bearbeiten | aka-Filmclub';
        setPageTitle(pageTitleMap[assocPage] + ' bearbeiten');
    }, [assocPage]);

    useEffect(() => {
        const page = getLastParameterFromPath();
        getText(page).then((res) => {
            setDefaultText(res.data);
            setAssocPage(page);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const draftFromHtml = htmlToDraft(defaultText, (nodeName) => {
            if (nodeName === 'hr') {
                return {
                    type: 'HORIZONTAL_RULE',
                    mutability: 'IMMUTABLE',
                    data: {},
                };
            }
        });
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(draftFromHtml)));
    }, [defaultText]);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <HintStyled>
                Hinweis: Das Einfügen und Entfernen der gelben Linie kann etwas hakelig sein. Beim Entfernen ist die
                Linie manchmal im Editor schon verschwunden, aber taucht nach dem Speichern wieder auf. Dann muss die
                Rücktaste beim Entfernen wahrscheinlich noch einmal mehr gedrückt werden. Beim Einfügen empfiehlt es
                sich, direkt in den bestehenden Absatz einzufügen und keinen neuen Absatz für die Linie zu machen.
            </HintStyled>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                customBlockRenderFunc={customBlockRenderer}
                wrapperStyle={wrapperStyleObject}
                toolbarStyle={toolbarStyleObject}
                editorStyle={editorStyleObject}
                toolbar={{
                    options: ['inline', 'blockType', 'link'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                    },
                    blockType: {
                        options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                    },
                    link: {
                        showOpenOptionOnHover: false,
                        defaultTargetOption: '_blank',
                    },
                }}
                toolbarCustomButtons={[<HorizontalLineToolbarButton key="1" />]}
            />
            <ValidationErrorContainerStyled>
                {validationErrors.map((error, index) => (
                    <ValidationErrorStyled key={index}>{error}</ValidationErrorStyled>
                ))}
            </ValidationErrorContainerStyled>
            <ButtonContainerStyled>
                <SaveButtonStyled onClick={saveText}>Speichern</SaveButtonStyled>
                <BackButtonStyled onClick={() => history.goBack()}>Zurück</BackButtonStyled>
            </ButtonContainerStyled>
        </PageStyled>
    );

    function saveText() {
        const htmlFromDraft = draftToHtml(
            convertToRaw(editorState.getCurrentContent()),
            null,
            null,
            customEntityTransform
        );
        const textObject = { text: htmlFromDraft };
        postText(assocPage, textObject)
            .then(() => {
                history.push('/' + assocPage);
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setValidationErrors(err.response.data.validationErrors);
                }
                if (err.response.status === 500) {
                    history.push('/error');
                }
                console.log(err.response.data);
            });
    }

    function customEntityTransform(entity) {
        if (entity && entity.type === 'HORIZONTAL_RULE') {
            return '<hr/>';
        }
    }

    function customBlockRenderer(block) {
        if (block.getType() === 'atomic') {
            const contentState = editorState.getCurrentContent();
            const entityKey = block.getEntityAt(0);
            const entity = contentState.getEntity(entityKey);
            if (entity && entity.type === 'HORIZONTAL_RULE') {
                return {
                    component: HorizontalRule,
                    editable: false,
                };
            }
        }
        return undefined;
    }

    function HorizontalRule() {
        return <hr />;
    }
}

const HintStyled = styled.div`
    margin-bottom: 20px;
    font-size: 0.7em;
    font-style: italic;
`;

const ValidationErrorContainerStyled = styled.div`
    color: red;
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;

const ButtonContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 100px 100px;
    grid-gap: 10px;
    margin-top: 20px;
`;

const SaveButtonStyled = styled.button``;

const BackButtonStyled = styled.button`
    background-color: var(--aka-grau);
`;

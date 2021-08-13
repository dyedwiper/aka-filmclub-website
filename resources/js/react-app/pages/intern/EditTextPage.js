import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useContext, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../common/BasePage';
import HorizontalLineToolbarButton from '../../common/forms/HorizontalLineToolbarButton';
import { PageHeadlineStyled } from '../../common/styledElements';
import Context from '../../Context';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { postImageFromWysiwygEditor } from '../../utils/services/imageServices';
import { getText, postText } from '../../utils/services/textServices';
import LoadingPage from '../LoadingPage';
import hintIcon from '../../assets/hint_icon.png';

export default function EditTextPage() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [assocPage, setAssocPage] = useState('');
    const [defaultText, setDefaultText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showHints, setShowHints] = useState(false);

    const { pageTitle, user } = useContext(Context);

    let history = useHistory();

    const pageTitleMap = {
        about: 'Über uns',
        contact: 'Kontakt',
        links: 'Links',
        press: 'Pressespiegel',
        awards: 'Auszeichnungen',
    };

    useEffect(() => {
        const page = getLastParameterFromPath();
        getText(page).then((res) => {
            setDefaultText(res.data.text);
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
        <BasePage pageTitle={pageTitleMap[assocPage] + ' bearbeiten'}>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <HintButtonStyled className={showHints && 'active'} onClick={() => setShowHints(!showHints)}>
                <HintIconStyled src={hintIcon} />
            </HintButtonStyled>
            {showHints && (
                <HintsStyled>
                    <HintStyled>
                        Für große <strong>Absätze</strong> <em>Enter</em> drücken, für kleine Absätze{' '}
                        <em>Shift+Enter</em>.
                    </HintStyled>
                    <HintStyled>
                        Beim <strong>Entfernen von Linien und Bildern </strong>
                        sind sie manchmal im Editor schon verschwunden, aber tauchen nach dem Speichern wieder auf. Dann
                        muss die Rück- bzw. Entfernen-Taste im Editor einmal mehr gedrückt werden, damit das Objekt
                        korrekt entfernt wird.
                    </HintStyled>
                    <HintStyled>
                        Bei der <strong>Größe der Bilder </strong>bitte nur die Breite setzen und die Höhe auf{' '}
                        <em>auto </em>
                        lassen, weil es sonst zu Verzerrungen kommen kann. Die Größe kann nicht nachträglich geändert
                        werden. Dazu muss das Bild neu eingefügt werden.
                    </HintStyled>
                    <HintStyled>
                        Wenn der Mauszeiger über einem eingefügten Bild ist, erscheint unter dem Bild eine{' '}
                        <strong>Option, um das Bild zu positionieren</strong>.
                    </HintStyled>
                    <HintStyled>
                        Wenn Bilder eingefügt sind, kann es nötig sein, einmal außerhalb des Editors zu klicken, bevor
                        der Speichern-Button funktioniert.
                    </HintStyled>
                </HintsStyled>
            )}
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                customBlockRenderFunc={customBlockRenderer}
                wrapperStyle={wrapperStyleObject}
                toolbarStyle={toolbarStyleObject}
                editorStyle={editorStyleObject}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'link', 'image'],
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
                    image: {
                        uploadCallback: uploadImage,
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
                        alt: { present: true, mandatory: false },
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
        </BasePage>
    );

    function saveText() {
        const htmlFromDraft = draftToHtml(
            convertToRaw(editorState.getCurrentContent()),
            null,
            null,
            customEntityTransform
        );
        const data = { text: htmlFromDraft, updated_by: user.username };
        postText(assocPage, data)
            .then(() => {
                history.push('/' + assocPage);
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setValidationErrors(err.response.data.validationErrors);
                }
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

    function uploadImage(image) {
        const formData = new FormData();
        formData.append('image', image);
        return postImageFromWysiwygEditor(formData)
            .then((res) => {
                return { data: { link: res.data } };
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setValidationErrors(err.response.data.validationErrors);
                }
            });
    }
}

const HintButtonStyled = styled.button`
    width: 48px;
    height: 48px;
    margin-bottom: 20px;
    border: none;
    box-shadow: none;
    padding: 0;
    transition: 1s;

    &.active {
        transform: rotate(180deg);
    }
`;

const HintIconStyled = styled.img`
    width: 48px;
    height: 48px;
`;

const HintsStyled = styled.div`
    margin-bottom: 20px;
`;

const HintStyled = styled.li`
    margin-bottom: 5px;
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
    color: white;
    background-color: var(--aka-grau);
`;

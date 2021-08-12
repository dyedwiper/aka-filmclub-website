import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useContext, useEffect, useState, useRef } from 'react';
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

export default function EditTextPage() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [assocPage, setAssocPage] = useState('');
    const [defaultText, setDefaultText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [validationErrors, setValidationErrors] = useState([]);
    const [showHtml, setShowHtml] = useState(false);

    const { pageTitle, user } = useContext(Context);

    const textareaElement = useRef(null);

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
            <HintStyled>
                Hinweise: Das Einfügen und Entfernen von Bildern und der gelben Linie kann etwas hakelig sein. Beim
                Entfernen sind sie manchmal im Editor schon verschwunden, aber tauchen nach dem Speichern wieder auf.
                Dann muss die Rücktaste beim Entfernen wahrscheinlich noch einmal mehr gedrückt werden. Beim Einfügen
                der Linie empfiehlt es sich, direkt in den bestehenden Absatz einzufügen und keinen neuen Absatz für die
                Linie zu machen. Die Größe der Bilder kann nicht nachträglich geändert werden - dazu muss das Bild neu
                eingefügt werden.Wenn der Mauszeiger über dem Bild ist, erscheint unter dem Bild eine Option, um das
                Bild zu positionieren. Wenn ein Bild eingefügt ist, muss vor dem Speichern erst einmal außerhalb des
                Editor geklickt werden, bevor der Speichern-Button funktioniert.
            </HintStyled>
            <ViewButtonGroupStyled>
                <ViewButtonStyled className={!showHtml && 'active'} onClick={() => setShowHtml(false)}>
                    WYSIWYG
                </ViewButtonStyled>
                <ViewButtonStyled className={showHtml && 'active'} onClick={() => setShowHtml(true)}>
                    HTML
                </ViewButtonStyled>
            </ViewButtonGroupStyled>
            {showHtml ? (
                <TextareaStyled ref={textareaElement} defaultValue={defaultText} />
            ) : (
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    customBlockRenderFunc={customBlockRenderer}
                    wrapperStyle={wrapperStyleObject}
                    toolbarStyle={toolbarStyleObject}
                    editorStyle={editorStyleObject}
                    toolbar={{
                        options: ['inline', 'blockType', 'link', 'image'],
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
            )}
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
        let data;
        if (showHtml) {
            data = { text: textareaElement.current.value, updated_by: user.username };
        } else {
            const htmlFromDraft = draftToHtml(
                convertToRaw(editorState.getCurrentContent()),
                null,
                null,
                customEntityTransform
            );
            data = { text: htmlFromDraft, updated_by: user.username };
        }
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

const HintStyled = styled.div`
    margin-bottom: 20px;
    font-size: 0.7em;
    font-style: italic;
`;

const ViewButtonGroupStyled = styled.div`
    margin-bottom: 10px;
`;

const ViewButtonStyled = styled.button`
    &.active {
        background-color: var(--aka-gelb);
    }
`;

const TextareaStyled = styled.textarea`
    height: 400px;
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

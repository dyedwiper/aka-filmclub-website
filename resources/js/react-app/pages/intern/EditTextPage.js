import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import HorizontalLineToolbarButton from '../../common/forms/HorizontalLineToolbarButton';
import { PageStyled } from '../../common/styledElements';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getText, postText } from '../../utils/textServices';
import LoadingPage from '../LoadingPage';

export default function EditTextPage() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [assocPage, setAssocPage] = useState('');
    const [defaultText, setDefaultText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    let history = useHistory();

    useEffect(() => {
        const page = getLastParameterFromPath();
        getText(page).then((res) => {
            setDefaultText(res.data);
            setAssocPage(page);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const draftFromHtml = htmlToDraft(defaultText, (nodeName, node) => {
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
                toolbarCustomButtons={[<HorizontalLineToolbarButton />]}
            />
            <ButtonContainerStyled>
                <SaveButtonStyled onClick={saveText}>Speichern</SaveButtonStyled>
                <BackButtonStyled onClick={() => history.goBack()}>Zurück</BackButtonStyled>
            </ButtonContainerStyled>
        </PageStyled>
    );

    function saveText() {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()), null, null, customEntityTransform);
        const textObject = { text: html };
        postText(assocPage, textObject).then(() => {
            history.goBack();
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

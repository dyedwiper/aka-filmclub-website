import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { postImageFromWysiwygEditor } from '../../utils/services/imageServices';
import HorizontalLineToolbarButton from './HorizontalLineToolbarButton';

export default function WysiwygEditor({
    defaultValue,
    inputName,
    setValidationErrors,
    isBlockTypeEnabled = false,
    isFontSizeEnabled = false,
    isImageUploadEnabled = false,
    isHorizontalRuleEnabled = false,
}) {
    const [editorState, setEditorState] = useState(() => createInitialState(defaultValue));

    return (
        <WysiwygEditorStyled>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                customBlockRenderFunc={customBlockRenderer}
                wrapperStyle={wrapperStyleObject}
                toolbarStyle={toolbarStyleObject}
                editorStyle={editorStyleObject}
                toolbar={configureToolbar()}
                toolbarCustomButtons={isHorizontalRuleEnabled && [<HorizontalLineToolbarButton key="1" />]}
            />
            <input type="hidden" name={inputName} value={createInputValue()} />
        </WysiwygEditorStyled>
    );

    function createInitialState(defaultValue) {
        let inititalState = EditorState.createEmpty();

        if (defaultValue) {
            const draftFromHtml = htmlToDraft(defaultValue, renderHorizontalRule);
            inititalState = EditorState.createWithContent(ContentState.createFromBlockArray(draftFromHtml));
        }

        return inititalState;
    }

    function renderHorizontalRule(nodeName) {
        if (nodeName === 'hr') {
            return {
                type: 'HORIZONTAL_RULE',
                mutability: 'IMMUTABLE',
                data: {},
            };
        }
    }

    function configureToolbar() {
        const options = ['inline', 'link'];
        if (isBlockTypeEnabled) {
            options.splice(1, 0, 'blockType');
        }
        if (isFontSizeEnabled) {
            const insertPosition = isBlockTypeEnabled ? 2 : 1;
            options.splice(insertPosition, 0, 'fontSize');
        }
        if (isImageUploadEnabled) {
            options.push('image');
        }

        const toolbar = {
            options,
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
        };

        return toolbar;
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

    function createInputValue() {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const htmlFromDraft = draftToHtml(rawContent, null, null, customEntityTransform);

        return htmlFromDraft;
    }

    function customEntityTransform(entity) {
        if (entity && entity.type === 'HORIZONTAL_RULE') {
            return '<hr/>';
        }
    }
}

const WysiwygEditorStyled = styled.div``;

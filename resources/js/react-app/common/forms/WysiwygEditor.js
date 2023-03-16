import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { uploadImage } from '../../utils/wysiwygEditorUtils';
import HorizontalLineToolbarButton from './HorizontalLineToolbarButton';

export default function WysiwygEditor({ editorState, setEditorState, setValidationErrors }) {
    return (
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
                    uploadCallback: (image) => uploadImage(image, setValidationErrors),
                    previewImage: true,
                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
                    alt: { present: true, mandatory: false },
                },
            }}
            toolbarCustomButtons={[<HorizontalLineToolbarButton key="1" />]}
        />
    );

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

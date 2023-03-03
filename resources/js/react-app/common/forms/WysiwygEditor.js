import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { postImageFromWysiwygEditor } from '../../utils/services/imageServices';

export default function WysiwygEditor({ inputName, defaultValue }) {
    const [editorState, setEditorState] = useState(() =>
        defaultValue
            ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(defaultValue)))
            : EditorState.createEmpty()
    );

    return (
        <WysiwygEditorStyled>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperStyle={wrapperStyleObject}
                toolbarStyle={toolbarStyleObject}
                editorStyle={editorStyleObject}
                toolbar={{
                    options: ['inline', 'link', 'image'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
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
            />
            <input type="hidden" name={inputName} value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
        </WysiwygEditorStyled>
    );

    function uploadImage(image) {
        const formData = new FormData();
        formData.append('image', image);
        return postImageFromWysiwygEditor(formData)
            .then((res) => {
                return { data: { link: res.data } };
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    // setValidationErrors(err.response.data.validationErrors);
                    console.log(err.response.data.validationErrors);
                }
            });
    }
}

const WysiwygEditorStyled = styled.div``;

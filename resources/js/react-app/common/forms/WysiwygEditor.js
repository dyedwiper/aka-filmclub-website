import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';
import { uploadImage } from '../../utils/wysiwygEditorUtils';

export default function WysiwygEditor({ inputName, defaultValue }) {
    const [editorState, setEditorState] = useState(() =>
        defaultValue
            ? EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(defaultValue)))
            : EditorState.createEmpty()
    );

    const [validationErrors, setValidationErrors] = useState([]);

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
                        uploadCallback: (image) => uploadImage(image, setValidationErrors),
                        previewImage: true,
                        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
                        alt: { present: true, mandatory: false },
                    },
                }}
            />
            <input type="hidden" name={inputName} value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
            <ValidationErrorContainerStyled>
                {validationErrors.map((error, index) => (
                    <ValidationErrorStyled key={index}>{error}</ValidationErrorStyled>
                ))}
            </ValidationErrorContainerStyled>
        </WysiwygEditorStyled>
    );
}

const WysiwygEditorStyled = styled.div``;

const ValidationErrorContainerStyled = styled.div`
    color: var(--aka-red);
`;

const ValidationErrorStyled = styled.div`
    margin-bottom: 10px;
`;

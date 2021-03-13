import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';
import { editorStyleObject, toolbarStyleObject, wrapperStyleObject } from '../../styles/wysisygEditorStyles';

export default function WysiwygEditor({ inputName, defaultValue }) {
    const [editorState, setEditorState] = useState(() =>
        defaultValue
            ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(defaultValue)))
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
                    options: ['inline', 'link'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                    },
                    link: {
                        showOpenOptionOnHover: false,
                        defaultTargetOption: '_blank',
                    },
                }}
            />
            <input type="hidden" name={inputName} value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
        </WysiwygEditorStyled>
    );
}

const WysiwygEditorStyled = styled.div``;

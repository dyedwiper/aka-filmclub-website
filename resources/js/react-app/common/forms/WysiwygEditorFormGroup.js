import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

export default function WysiwygEditorFormGroup({ inputName, defaultValue }) {
    const [editorState, setEditorState] = useState(() =>
        defaultValue
            ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(defaultValue)))
            : EditorState.createEmpty()
    );

    return (
        <WysiwygEditorFormGroupStyled>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperStyle={wrapperStyleObject}
                toolbarStyle={toolbarStyleObject}
                editorStyle={editorStyleObject}
                toolbar={{ options: ['inline', 'link'] }}
            />
            <input type="hidden" name={inputName} value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
        </WysiwygEditorFormGroupStyled>
    );
}

const WysiwygEditorFormGroupStyled = styled.div``;

const wrapperStyleObject = {
    border: '1px solid black',
    borderRadius: '5px',
};

const toolbarStyleObject = {
    backgroundColor: 'var(--aka-gelb)',
};

const editorStyleObject = {
    padding: '5px',
};

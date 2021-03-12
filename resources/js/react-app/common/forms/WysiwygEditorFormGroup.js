import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function WysiwygEditorFormGroup({ inputName }) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    // useEffect(() => {
    //     console.log(stateToHTML(editorState.getCurrentContent()));
    // }, [editorState]);

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
            <input type="hidden" name={inputName} value={stateToHTML(editorState.getCurrentContent())} />
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

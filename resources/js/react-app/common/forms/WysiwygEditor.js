import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function WysiwygEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        console.log(stateToHTML(editorState.getCurrentContent()));
    }, [editorState]);

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperStyle={wrapperStyleObject}
            toolbarStyle={toolbarStyleObject}
            editorStyle={editorStyleObject}
            toolbar={{ options: ['inline', 'link'] }}
        />
    );
}

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

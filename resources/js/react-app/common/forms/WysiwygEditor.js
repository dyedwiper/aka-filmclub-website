import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

export default function WysiwygEditor() {
    return (
        <Editor
            toolbarClassName="wysiwygToolbar"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{ options: ['inline', 'link'] }}
        />
    );
}

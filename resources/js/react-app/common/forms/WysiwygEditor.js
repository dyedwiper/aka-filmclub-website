import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

export default function WysiwygEditor() {
    const toolbarStyleObject = {
        backgroundColor: 'aquamarine',
    };

    return <Editor toolbarStyle={toolbarStyleObject} toolbar={{ options: ['inline', 'link'] }} />;
}

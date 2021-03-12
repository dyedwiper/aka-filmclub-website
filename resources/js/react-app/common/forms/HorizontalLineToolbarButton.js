import { ContentState, EditorState, Modifier } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import React from 'react';
import { HorizontalLineStyled } from '../styledElements';

export default function HorizontalLineToolbarButton({ onChange, editorState }) {
    return (
        <div className="rdw-inline-wrapper">
            <div className="rdw-option-wrapper" onClick={handleClick}>
                Hori
            </div>
        </div>
    );

    function handleClick() {
        const { contentBlocks, entityMap } = htmlToDraft('<h3>hello world</h3><div>foo</div>');
        const blockMap = ContentState.createFromBlockArray(contentBlocks, entityMap).getBlockMap();
        console.log(blockMap);
        const contentState = Modifier.replaceWithFragment(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            blockMap
        );
        onChange(EditorState.push(editorState, contentState, 'insert-fragment'));
    }
}

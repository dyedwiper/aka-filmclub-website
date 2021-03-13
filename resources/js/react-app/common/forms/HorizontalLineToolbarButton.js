import { AtomicBlockUtils } from 'draft-js';
import React from 'react';

export default function HorizontalLineToolbarButton({ onChange, editorState }) {
    return (
        <div className="rdw-inline-wrapper">
            <div className="rdw-option-wrapper" onClick={addHorizontalRuleRemovingSelection}>
                Hori
            </div>
        </div>
    );

    function addHorizontalRuleRemovingSelection() {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('HORIZONTAL_RULE', 'IMMUTABLE', {});
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        onChange(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '));
    }
}

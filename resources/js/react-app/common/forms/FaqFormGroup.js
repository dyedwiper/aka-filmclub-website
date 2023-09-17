import React from 'react';
import styled from 'styled-components';
import PositionSelect from './PositionSelect';
import WysiwygFormInput from './WysiwygFormInput';

export default function FaqFormGroup({ faq }) {
    return (
        <FaqFormGroupStyled>
            <LabelStyled>
                Frage
                <InputStyled name="question" defaultValue={faq && faq.question} />
            </LabelStyled>
            <FakeLabelStyled>
                Antwort
                <WysiwygFormInput inputName="answer" defaultValue={faq && faq.answer} />
            </FakeLabelStyled>
            {faq && (
                <PositionLabelStyled>
                    Position
                    <PositionSelect type="faq" defaultPosition={faq.position} />
                </PositionLabelStyled>
            )}
        </FaqFormGroupStyled>
    );
}

const FaqFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

// This is used because a real label element surrounding the Wysiwyg editor leads to unexpected behavior.
// And at the moment it is also not possible to explicitly associate a label to the editor, see: https://github.com/jpuri/react-draft-wysiwyg/issues/539
const FakeLabelStyled = styled.div`
    display: block;
    margin: 20px 0;
`;

const PositionLabelStyled = styled.label`
    display: grid;
    grid-template-columns: 80px 100px;
    align-items: center;
`;

const InputStyled = styled.input``;

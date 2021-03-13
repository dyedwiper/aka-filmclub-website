import React from 'react';
import styled from 'styled-components';

export default function FaqFormGroup({ faq, isEditing }) {
    return (
        <FaqFormGroupStyled>
            <LabelStyled>
                Frage
                <InputStyled name="question" defaultValue={faq && faq.question} />
            </LabelStyled>
            <LabelStyled>
                Antwort
                <InputStyled name="answer" defaultValue={faq && faq.answer} />
            </LabelStyled>
            <LabelStyled>
                Position
                <InputStyled disabled={!isEditing} name="position" defaultValue={faq && faq.position} />
            </LabelStyled>
        </FaqFormGroupStyled>
    );
}

const FaqFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    margin: 20px 0;
    display: block;
`;

const InputStyled = styled.input``;

import React from 'react';
import styled from 'styled-components';
import PositionSelect from './PositionSelect';
import WysiwygEditor from './WysiwygEditor';

export default function FaqFormGroup({ faq }) {
    return (
        <FaqFormGroupStyled>
            <LabelStyled>
                Frage
                <InputStyled name="question" defaultValue={faq && faq.question} />
            </LabelStyled>
            <LabelStyled>
                Antwort
                <WysiwygEditor inputName="answer" defaultValue={faq && faq.answer} />
            </LabelStyled>
            <PositionLabelStyled>
                Position
                <PositionSelect type="faq" disabled={!faq} defaultPosition={faq && faq.position} />
            </PositionLabelStyled>
        </FaqFormGroupStyled>
    );
}

const FaqFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const PositionLabelStyled = styled.label`
    display: grid;
    grid-template-columns: 80px 100px;
    align-items: center;
`;

const InputStyled = styled.input``;

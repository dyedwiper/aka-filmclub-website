import React from 'react';
import styled from 'styled-components';

export default function FaqRow({ faq }) {
    return (
        <FaqRowStyled>
            <QuestionStyled id={faq.uuid}>{faq.question}</QuestionStyled>
            <AnswerStyled dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </FaqRowStyled>
    );
}

const FaqRowStyled = styled.li`
    margin: 20px 0;
`;

const QuestionStyled = styled.h3``;

const AnswerStyled = styled.div``;

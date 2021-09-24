import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../../Context';

export default function FaqRow({ faq }) {
    const { isUserEditor } = useContext(Context);

    return (
        <FaqRowStyled>
            <QuestionStyled id={faq.uuid}>{faq.question}</QuestionStyled>
            <AnswerStyled dangerouslySetInnerHTML={{ __html: faq.answer }} />
            {isUserEditor && <LinkStyled to={'/intern/editFaq/' + faq.uuid}>Bearbeiten</LinkStyled>}
        </FaqRowStyled>
    );
}

const FaqRowStyled = styled.li`
    margin: 20px 0;
`;

const QuestionStyled = styled.h3``;

const AnswerStyled = styled.div``;

const LinkStyled = styled(Link)``;

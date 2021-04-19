import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AUTH_LEVEL_EDITOR } from '../../constants';
import Context from '../../Context';

export default function FaqRow({ faq }) {
    const { user } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    return (
        <FaqRowStyled>
            <QuestionStyled id={faq.uuid}>{faq.question}</QuestionStyled>
            <AnswerStyled dangerouslySetInnerHTML={{ __html: faq.answer }} />
            {isAuthorized && <LinkStyled to={'/intern/editFaq/' + faq.uuid}>Bearbeiten</LinkStyled>}
        </FaqRowStyled>
    );
}

const FaqRowStyled = styled.li`
    margin: 20px 0;
`;

const QuestionStyled = styled.h3``;

const AnswerStyled = styled.div``;

const LinkStyled = styled(Link)``;

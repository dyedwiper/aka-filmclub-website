import React, { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import FaqRow from '../common/misc/FaqRow';
import { AddItemLinkStyled, HorizontalRuleStyled, PageHeadlineStyled } from '../common/styledElements';
import { AUTH_LEVEL_EDITOR, PAGE_TITLE_FAQS, ROUTE_INTERN_ADD_FAQ } from '../constants';
import Context from '../Context';
import { getFaqs } from '../utils/services/faqServices';
import LoadingPage from './LoadingPage';

export default function FaqsPage() {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        getFaqs().then((res) => {
            setFaqs(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_FAQS}>
            <PageHeadlineStyled>{PAGE_TITLE_FAQS}</PageHeadlineStyled>
            {isAuthorized && <AddItemLinkStyled to={ROUTE_INTERN_ADD_FAQ}>FAQ hinzufügen</AddItemLinkStyled>}
            <QuestionsListStyled>
                {faqs.map((faq) => (
                    <QuestionLinkItemStyled key={faq.id}>
                        <HashLink smooth to={'#' + faq.uuid}>
                            {faq.question}
                        </HashLink>
                    </QuestionLinkItemStyled>
                ))}
            </QuestionsListStyled>
            <HorizontalRuleStyled />
            <AnswersListStyled>
                {faqs.map((faq) => (
                    <FaqRow key={faq.id} faq={faq} />
                ))}
            </AnswersListStyled>
        </BasePage>
    );
}

const QuestionsListStyled = styled.ul`
    margin: 20px 0 10px 0;
`;

const QuestionLinkItemStyled = styled.li`
    margin: 10px 0;
`;

const AnswersListStyled = styled.ul``;

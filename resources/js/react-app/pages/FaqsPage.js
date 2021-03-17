import React, { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import FaqRow from '../common/FaqRow';
import { AddItemLinkStyled, HorizontalRuleStyled, PageHeadlineStyled, PageStyled } from '../common/styledElements';
import { AUTH_LEVEL_EDITOR } from '../constants';
import Context from '../Context';
import { getFaqs } from '../utils/faqServices';
import LoadingPage from './LoadingPage';

export default function FaqsPage() {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, pageTitle, setPageTitle } = useContext(Context);

    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        getFaqs().then((res) => {
            setFaqs(res.data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        document.title = 'FAQs | aka-Filmclub';
        setPageTitle('FAQs');
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            {isAuthorized && <AddItemLinkStyled to="/intern/addFaq">FAQ hinzufügen</AddItemLinkStyled>}
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
        </PageStyled>
    );
}

const QuestionsListStyled = styled.ul`
    margin: 20px 0 10px 0;
`;

const QuestionLinkItemStyled = styled.li`
    margin: 10px 0;
`;

const AnswersListStyled = styled.ul``;

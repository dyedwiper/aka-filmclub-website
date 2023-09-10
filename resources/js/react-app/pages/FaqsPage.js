import React, { useContext, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import FaqRow from '../common/misc/FaqRow';
import { AddItemLinkStyled, PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_FAQS, ROUTE_INTERN_ADD_FAQ } from '../constants';
import Context from '../Context';
import { getFaqs } from '../services/faqServices';
import LoadingPage from './LoadingPage';

export default function FaqsPage() {
    const [faqs, setFaqs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { isUserEditor } = useContext(Context);

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
            {isUserEditor && <AddItemLinkStyled to={ROUTE_INTERN_ADD_FAQ}>FAQ hinzufügen</AddItemLinkStyled>}
            <QuestionsListStyled>
                {faqs.map((faq) => (
                    <QuestionLinkItemStyled key={faq.id}>
                        <HashLink to={'#' + faq.uuid} scroll={scrollWithOffset}>
                            {faq.question}
                        </HashLink>
                    </QuestionLinkItemStyled>
                ))}
            </QuestionsListStyled>
            <hr />
            <AnswersListStyled>
                {faqs.map((faq) => (
                    <FaqRow key={faq.id} faq={faq} />
                ))}
            </AnswersListStyled>
        </BasePage>
    );

    function scrollWithOffset(element) {
        // As proposed here: https://github.com/rafgraph/react-router-hash-link/issues/25
        const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -80;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    }
}

const QuestionsListStyled = styled.ul`
    margin: 20px 0 10px 0;
`;

const QuestionLinkItemStyled = styled.li`
    margin: 10px 0;
`;

const AnswersListStyled = styled.ul``;

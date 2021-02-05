import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Notice from '../common/Notice';
import Paginator from '../common/Paginator';
import { PageStyled } from '../common/styledElements';
import { NOTICES_PER_PAGE } from '../constants';
import { getNoticesByPage, getNoticesCount } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(0);
    const [noticesCount, setNoticesCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'News | aka-Filmclub ';
    }, []);

    useEffect(() => {
        getNoticesCount().then((res) => {
            setNoticesCount(res.data);
        });
    }, []);

    useEffect(() => {
        console.log('page', page);
        const query = new URLSearchParams(window.location.search);
        const currentPage = Number(query.get('page'));
        // Set page to 1 if query is empty
        currentPage ? setPage(currentPage) : setPage(1);
        // Only perform request when page has not initial value of 0
        if (page) {
            getNoticesByPage(page).then((res) => {
                setNotices(res.data.data);
                setIsLoading(false);
            });
        }
    }, [page]);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>News</HeadlineStyled>
            {notices.map((notice) => (
                <Notice key={notice.id} notice={notice} />
            ))}
            <Paginator
                site="news"
                page={page}
                setPage={setPage}
                setIsLoading={setIsLoading}
                limit={noticesCount}
                itemsPerPage={NOTICES_PER_PAGE}
            />
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

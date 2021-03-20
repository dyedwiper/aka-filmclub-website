import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import NoticeRow from '../common/NoticeRow';
import Paginator from '../common/Paginator';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import { NOTICES_PER_PAGE } from '../constants';
import Context from '../Context';
import { getNoticesByPage, getNoticesCount } from '../utils/services/noticeServices';
import LoadingPage from './LoadingPage';

export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(0);
    const [noticesCount, setNoticesCount] = useState(0);
    const [isLoadingNotices, setIsLoadingNotices] = useState(true);
    const [isLoadingCount, setIsLoadingCount] = useState(true);

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'News | aka-Filmclub';
        setPageTitle('News');
    }, []);

    useEffect(() => {
        getNoticesCount().then((res) => {
            setNoticesCount(res.data);
            setIsLoadingCount(false);
        });
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const currentPage = Number(query.get('page'));
        // Set page to 1 if query is empty
        currentPage ? setPage(currentPage) : setPage(1);
        // Only perform request when page has not initial value of 0
        if (page) {
            getNoticesByPage(page).then((res) => {
                setNotices(res.data.data);
                setIsLoadingNotices(false);
            });
        }
    }, [page]);

    if (isLoadingNotices || isLoadingCount) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>News</PageHeadlineStyled>
            <ListStyled>
                {notices.map((notice) => (
                    <NoticeRow key={notice.id} notice={notice} />
                ))}
            </ListStyled>
            <Paginator
                site={window.location.pathname}
                page={page}
                setPage={setPage}
                setIsLoading={setIsLoadingNotices}
                limit={noticesCount}
                itemsPerPage={NOTICES_PER_PAGE}
            />
        </PageStyled>
    );
}

const ListStyled = styled.ul``;

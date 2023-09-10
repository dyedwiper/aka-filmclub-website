import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import Paginator from '../common/misc/Paginator';
import NoticeRow from '../common/notices/NoticeRow';
import { PageHeadlineStyled } from '../common/styledElements';
import { NOTICES_PER_PAGE, PAGE_TITLE_NEWS } from '../constants';
import { getNoticesByPage, getNoticesCount } from '../services/noticeServices';
import LoadingPage from './LoadingPage';

export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(0);
    const [noticesCount, setNoticesCount] = useState(0);
    const [isLoadingNotices, setIsLoadingNotices] = useState(true);
    const [isLoadingCount, setIsLoadingCount] = useState(true);

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
        <BasePage pageTitle={PAGE_TITLE_NEWS}>
            <PageHeadlineStyled>{PAGE_TITLE_NEWS}</PageHeadlineStyled>
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
        </BasePage>
    );
}

const ListStyled = styled.ul``;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Notice from '../common/Notice';
import { PageStyled } from '../common/styledElements';
import { getNotices } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNotices().then((res) => {
            setNotices(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            {notices.map((notice) => (
                <Notice key={notice.id} notice={notice} />
            ))}
        </PageStyled>
    );
}

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { PageStyled } from '../common/styledElements';
import { getSerialByUuid } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function SerialPage() {
    const [serial, setSerial] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noSerialFound, SetNoSerialFound] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        const serialUuid = path.slice(path.lastIndexOf('/') + 1);
        console.log(serialUuid);
        getSerialByUuid(serialUuid).then((res) => {
            if (!res.data.uuid) {
                SetNoSerialFound(true);
            }
            console.log(res.data);
            setSerial(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    if (noSerialFound) return <Redirect to="/404" />;

    return (
        <PageStyled>
            <SerialTitleStyled>{serial.title}</SerialTitleStyled>
            <SerialSubtitleStyled>{serial.subtitle}</SerialSubtitleStyled>
            <SerialArticleStyled>{serial.article}</SerialArticleStyled>
            <SerialAuthorStyled>{serial.author}</SerialAuthorStyled>
        </PageStyled>
    );
}
const SerialTitleStyled = styled.h2``;

const SerialSubtitleStyled = styled.p``;

const SerialArticleStyled = styled.p``;

const SerialAuthorStyled = styled.div``;

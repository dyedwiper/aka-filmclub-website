import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled } from '../common/styledElements';
import { formatDate } from '../utils/dateFormatters';
import { getScreeningsBySerialFk } from '../utils/screeningServices';
import { getSerialByUuid } from '../utils/serialServices';
import LoadingPage from './LoadingPage';

export default function SerialPage() {
    const [serial, setSerial] = useState({});
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [noSerialFound, SetNoSerialFound] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        const serialUuid = path.slice(path.lastIndexOf('/') + 1);
        getSerialByUuid(serialUuid).then((res) => {
            if (!res.data.uuid) {
                SetNoSerialFound(true);
            }
            setSerial(res.data);
            getScreeningsBySerialFk(res.data.id).then((res) => {
                setScreenings(res.data);
                setIsLoading(false);
            });
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    if (noSerialFound) return <Redirect to="/404" />;

    return (
        <PageStyled>
            <SerialTitleStyled>{serial.title}</SerialTitleStyled>
            <SerialSubtitleStyled>{serial.subtitle}</SerialSubtitleStyled>
            <HorizontalLineStyled />
            <SerialArticleStyled>{serial.article}</SerialArticleStyled>
            <SerialAuthorStyled>{serial.author}</SerialAuthorStyled>
            <HorizontalLineStyled />
            <ScreeningsListStyled>
                {screenings.map((screening) => (
                    <ScreeningListItemStyled key={screening.id}>
                        <ScreeningDateStyled>{formatDate(screening.date)}</ScreeningDateStyled>
                        <ScreeningTitleLinkStyled to={'/screening/' + screening.uuid}>
                            {screening.title}
                        </ScreeningTitleLinkStyled>
                    </ScreeningListItemStyled>
                ))}
            </ScreeningsListStyled>
        </PageStyled>
    );
}
const SerialTitleStyled = styled.h2``;

const SerialSubtitleStyled = styled.p``;

const ScreeningsListStyled = styled.ul``;

const ScreeningListItemStyled = styled.li`
    margin: 5px 0;
`;

const ScreeningDateStyled = styled.div`
    display: inline-block;
    margin-right: 10px;
`;

const ScreeningTitleLinkStyled = styled(Link)`
    font-weight: bold;
`;

const SerialArticleStyled = styled.p``;

const SerialAuthorStyled = styled.div``;

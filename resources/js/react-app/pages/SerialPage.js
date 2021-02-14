import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled } from '../common/styledElements';
import { STORAGE_FOLDER } from '../constants';
import { formatDate } from '../utils/dateFormatters';
import { getSerialByUuid } from '../utils/serialServices';
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
            setSerial(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    if (noSerialFound) return <Redirect to="/404" />;

    return (
        <PageStyled>
            <TitleStyled>{serial.title}</TitleStyled>
            <SubtitleStyled>{serial.subtitle}</SubtitleStyled>
            <HorizontalLineStyled />
            {serial.image && <ImageStyled src={STORAGE_FOLDER + serial.image.path} />}
            <ArticleStyled>{serial.article}</ArticleStyled>
            <AuthorStyled>{serial.author}</AuthorStyled>
            <HorizontalLineStyled />
            <ScreeningsListStyled>
                {serial.screenings.map((screening) => (
                    <ScreeningListItemStyled key={screening.id}>
                        <ScreeningDateStyled>{formatDate(screening.date)}</ScreeningDateStyled>
                        <ScreeningTitleLinkStyled to={'/screening/' + screening.uuid}>
                            {screening.title}
                        </ScreeningTitleLinkStyled>
                    </ScreeningListItemStyled>
                ))}
            </ScreeningsListStyled>
            {serial.image && (
                <EditImageLinkStyled to={'/intern/editimage/' + serial.image.uuid}>Bild ändern</EditImageLinkStyled>
            )}
        </PageStyled>
    );
}
const TitleStyled = styled.h2``;

const SubtitleStyled = styled.p``;

const ImageStyled = styled.img``;

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

const ArticleStyled = styled.p``;

const AuthorStyled = styled.div``;

const EditImageLinkStyled = styled(Link)``;

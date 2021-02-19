import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled } from '../common/styledElements';
import { STORAGE_FOLDER } from '../constants';
import { formatToDateString } from '../utils/dateFormatters';
import { getLastParameterFromPath } from '../utils/pathUtils';
import { getSerialByUuid } from '../utils/serialServices';
import LoadingPage from './LoadingPage';

export default function SerialPage() {
    const [serial, setSerial] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noSerialFound, SetNoSerialFound] = useState(false);

    useEffect(() => {
        const serialUuid = getLastParameterFromPath();
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
                        <ScreeningDateStyled>{formatToDateString(screening.date)}</ScreeningDateStyled>
                        <ScreeningTitleLinkStyled to={'/screening/' + screening.uuid}>
                            {screening.title}
                        </ScreeningTitleLinkStyled>
                    </ScreeningListItemStyled>
                ))}
            </ScreeningsListStyled>
            <HorizontalLineStyled />
            <LinkStyled to={'/intern/editSerial/' + serial.uuid}>Reihe bearbeiten</LinkStyled>
            <VertialLineStyled> | </VertialLineStyled>
            {serial.image ? (
                <LinkStyled to={'/intern/editImage/' + serial.image.uuid}>Bild bearbeiten</LinkStyled>
            ) : (
                <LinkStyled to={'/intern/addImage/serial/' + serial.uuid}>Bild hinzufügen</LinkStyled>
            )}
        </PageStyled>
    );
}
const TitleStyled = styled.h2``;

const SubtitleStyled = styled.p``;

const ImageStyled = styled.img`
    width: 100%;
`;

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

const LinkStyled = styled(Link)``;

const VertialLineStyled = styled.span`
    color: var(--aka-gelb);
    font-weight: bold;
`;

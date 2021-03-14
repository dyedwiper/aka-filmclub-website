import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled } from '../common/styledElements';
import { AUTH_LEVEL_EDITOR, STORAGE_FOLDER } from '../constants';
import Context from '../Context';
import { formatToDateString } from '../utils/dateFormatters';
import { getLastParameterFromPath } from '../utils/pathUtils';
import { getSerialByUuid } from '../utils/serialServices';
import LoadingPage from './LoadingPage';

export default function SerialPage() {
    const [serial, setSerial] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noSerialFound, SetNoSerialFound] = useState(false);

    const { user, setPageTitle } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        document.title = serial.title + ' | aka-Filmclub';
        setPageTitle('Filmreihe');
    }, [isLoading]);

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
            {serial.image ? (
                <ImageContainerStyled>
                    <ImageStyled src={STORAGE_FOLDER + serial.image.path} />
                    <TitleContainerStyled>
                        <TitleStyled>{serial.title}</TitleStyled>
                        <SubtitleStyled>{serial.subtitle}</SubtitleStyled>
                    </TitleContainerStyled>
                </ImageContainerStyled>
            ) : (
                <>
                    <FallbackTitleStyled>{serial.title}</FallbackTitleStyled>
                    <FallbackSubtitleStyled>{serial.subtitle}</FallbackSubtitleStyled>
                </>
            )}
            <TextContainerStyled>
                <ArticleStyled dangerouslySetInnerHTML={{ __html: serial.article }} />
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
                {isAuthorized && (
                    <>
                        <HorizontalLineStyled />
                        <LinkStyled to={'/intern/editSerial/' + serial.uuid}>Reihe bearbeiten</LinkStyled>
                        <VertialLineStyled> | </VertialLineStyled>
                        {serial.image ? (
                            <LinkStyled to={'/intern/editImage/' + serial.image.uuid}>Bild bearbeiten</LinkStyled>
                        ) : (
                            <LinkStyled to={'/intern/addImage/serial/' + serial.uuid}>Bild hinzufügen</LinkStyled>
                        )}
                    </>
                )}
            </TextContainerStyled>
        </PageStyled>
    );
}

const ImageContainerStyled = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

const ImageStyled = styled.img`
    width: 100%;
`;

const TitleContainerStyled = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 60px 20px 10px 20px;
    color: var(--aka-gelb);
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const TitleStyled = styled.h2`
    display: inline-block;
    margin: 0 20px 0 0;
    font-size: 3em;
`;

const SubtitleStyled = styled.span``;

const FallbackTitleStyled = styled.h2`
    margin: 10px 0;
    padding: 0 20px;
    font-size: 2.1em;
`;

const FallbackSubtitleStyled = styled.div`
    margin-bottom: 10px;
    padding: 0 20px;
    font-weight: bold;
`;

const TextContainerStyled = styled.div`
    padding: 0 20px;
`;

const ScreeningsListStyled = styled.ul``;

const ScreeningListItemStyled = styled.li`
    display: grid;
    grid-template-columns: 95px minmax(0, 1fr);
    margin: 5px 0;
`;

const ScreeningDateStyled = styled.div``;

const ScreeningTitleLinkStyled = styled(Link)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
`;

const ArticleStyled = styled.p``;

const AuthorStyled = styled.div`
    font-style: italic;
`;

const LinkStyled = styled(Link)``;

const VertialLineStyled = styled.span`
    color: var(--aka-gelb);
    font-weight: bold;
`;

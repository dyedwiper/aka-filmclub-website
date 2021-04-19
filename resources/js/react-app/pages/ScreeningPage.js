import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import CalendarDownloadLink from '../common/calendar/CalendarDownloadLink';
import CreditsContainer from '../common/screenings/CreditsContainer';
import FilmInfoContainer from '../common/screenings/FilmInfoContainer';
import { HorizontalRuleStyled, PageStyled, VerticalLineStyled } from '../common/styledElements';
import {
    AUTH_LEVEL_EDITOR,
    ROUTE_INTERN_ADD_IMAGE_SCREENING,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_SCREENING,
    ROUTE_NOT_FOUND,
    ROUTE_SERIAL,
    STORAGE_FOLDER,
} from '../constants';
import Context from '../Context';
import { formatToDateTimeStringWithWeekday } from '../utils/dateFormatters';
import { getLastParameterFromPath } from '../utils/pathUtils';
import { getScreeningByUuid } from '../utils/services/screeningServices';
import LoadingPage from './LoadingPage';

export default function ScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noScreeningFound, setNoScreeningFound] = useState(false);

    const { user, setPageTitle } = useContext(Context);
    const isAuthorized = user.level >= AUTH_LEVEL_EDITOR;

    useEffect(() => {
        document.title = screening.title + ' | aka-Filmclub';
        setPageTitle('Vorführung');
    }, [isLoading]);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getScreeningByUuid(uuid).then((res) => {
            if (!res.data.uuid) {
                setNoScreeningFound(true);
            }
            setScreening(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    if (noScreeningFound) return <Redirect to={ROUTE_NOT_FOUND} />;

    return (
        <PageStyled>
            {screening.image ? (
                <ImageContainerStyled>
                    <ImageStyled src={STORAGE_FOLDER + screening.image.path} />
                    <TitleContainerStyled>
                        <TitleStyled>{screening.title}</TitleStyled>
                        <DateStyled>{formatToDateTimeStringWithWeekday(screening.date)}</DateStyled>
                    </TitleContainerStyled>
                </ImageContainerStyled>
            ) : (
                <>
                    <FallbackTitleStyled>{screening.title}</FallbackTitleStyled>
                    <FallbackDateStyled>{formatToDateTimeStringWithWeekday(screening.date)}</FallbackDateStyled>
                </>
            )}
            <TextContainerStyled>
                {new Date(screening.date) >= Date.now() && <CalendarDownloadLink screening={screening} />}
                <FilmInfoContainer film={screening} />
                <CreditsContainer film={screening} />
                <SynopsisStyled dangerouslySetInnerHTML={{ __html: screening.synopsis }} />
                <AuthorStyled>{screening.author}</AuthorStyled>
                {screening.serial && (
                    <SerialContainerStyled>
                        <HorizontalRuleStyled />
                        Gezeigt im Rahmen der Filmreihe:{' '}
                        <SerialLinkStyled to={ROUTE_SERIAL + screening.serial.uuid}>
                            {screening.serial.title}
                        </SerialLinkStyled>
                    </SerialContainerStyled>
                )}
                {isAuthorized && (
                    <>
                        <HorizontalRuleStyled />
                        <EditLinkStyled to={ROUTE_INTERN_EDIT_SCREENING + screening.uuid}>
                            Vorführung bearbeiten
                        </EditLinkStyled>
                        <VerticalLineStyled> | </VerticalLineStyled>
                        {screening.image ? (
                            <EditLinkStyled to={ROUTE_INTERN_EDIT_IMAGE + screening.image.uuid}>
                                Bild bearbeiten
                            </EditLinkStyled>
                        ) : (
                            <EditLinkStyled to={ROUTE_INTERN_ADD_IMAGE_SCREENING + screening.uuid}>
                                Bild hinzufügen
                            </EditLinkStyled>
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
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const TitleStyled = styled.h2`
    display: inline-block;
    margin: 0 20px 0 0;
    color: var(--aka-gelb);
    font-size: 3em;
`;

const DateStyled = styled.span`
    white-space: nowrap;
    color: var(--aka-gelb);
`;

const FallbackTitleStyled = styled.h2`
    margin: 10px 0;
    padding: 0 20px;
    font-size: 2.1em;
`;

const FallbackDateStyled = styled.div`
    margin-bottom: 10px;
    padding: 0 20px;
    font-weight: bold;
`;

const TextContainerStyled = styled.div`
    padding: 0 20px;
`;

const SynopsisStyled = styled.div`
    margin: 10px 0;
`;

const AuthorStyled = styled.div`
    font-style: italic;
`;

const SerialContainerStyled = styled.div``;

const SerialLinkStyled = styled(Link)`
    font-weight: bold;

    @media (max-width: 767px) {
        display: block;
    }
`;

const EditLinkStyled = styled(Link)``;

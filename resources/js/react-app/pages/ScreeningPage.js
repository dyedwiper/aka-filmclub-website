import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CalendarDownloadLink from '../common/calendar/CalendarDownloadLink';
import CopyrightContainer from '../common/misc/CopyrightContainer';
import UpdateInfo from '../common/misc/UpdateInfo';
import CreditsContainer from '../common/screenings/CreditsContainer';
import MainFilmInfo from '../common/screenings/MainFilmInfo';
import SupportingFilmsList from '../common/screenings/SupportingFilmsList';
import { PageStyled, VerticalLineStyled } from '../common/styledElements';
import {
    PAGE_TITLE_PROGRAM,
    ROUTE_INTERN_ADD_BILLING,
    ROUTE_INTERN_ADD_IMAGE_SCREENING,
    ROUTE_INTERN_EDIT_BILLING,
    ROUTE_INTERN_EDIT_IMAGE,
    ROUTE_INTERN_EDIT_SCREENING,
    ROUTE_NOT_FOUND,
    ROUTE_SERIAL,
    STORAGE_FOLDER,
} from '../constants';
import Context from '../Context';
import { formatToDateTimeStringWithWeekday } from '../utils/dateFormatters';
import { showScreeningImage } from '../utils/imageUtils';
import { getScreeningByUuid } from '../utils/services/screeningServices';
import LoadingPage from './LoadingPage';

export default function ScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noScreeningFound, setNoScreeningFound] = useState(false);

    const { isUserEditor, setPageTitle } = useContext(Context);

    const { uuid } = useParams();

    useEffect(() => {
        document.title = screening.title + ' | aka-Filmclub';
        setPageTitle(PAGE_TITLE_PROGRAM);
    }, [screening]);

    useEffect(() => {
        getScreeningByUuid(uuid).then((res) => {
            if (!res.data.uuid) {
                setNoScreeningFound(true);
            }
            setScreening(res.data);
            setIsLoading(false);
        });
    }, [uuid]);

    if (isLoading) return <LoadingPage />;

    if (noScreeningFound) return <Redirect to={ROUTE_NOT_FOUND} />;

    return (
        <PageStyled>
            {showScreeningImage(screening) ? (
                <ImageAndCopyrightContainerStyled>
                    <ImageContainerStyled>
                        <ImageStyled src={STORAGE_FOLDER + screening.image.path} alt={screening.image.alt_text} />
                        <TitleContainerStyled>
                            <TitleStyled>{screening.title}</TitleStyled>
                        </TitleContainerStyled>
                    </ImageContainerStyled>
                    <CopyrightContainer image={screening.image} />
                </ImageAndCopyrightContainerStyled>
            ) : (
                <FallbackTitleStyled>{screening.title}</FallbackTitleStyled>
            )}
            <TextContainerStyled>
                {screening.special && <SpecialStyled>{screening.special}</SpecialStyled>}
                {screening.main_film && <MainFilmInfo screening={screening} />}
                {screening.supporting_films.length > 0 && (
                    <SpecialStyled>
                        <SupportingFilmsList screening={screening} />
                    </SpecialStyled>
                )}
                <DateAndVenueStyled>
                    {formatToDateTimeStringWithWeekday(screening.date)} <VerticalLineStyled>|</VerticalLineStyled>{' '}
                    {screening.venue}
                </DateAndVenueStyled>
                {new Date(screening.date.replace(' ', 'T')) >= Date.now() && (
                    <CalendarDownloadLink screening={screening} />
                )}
                <CreditsContainer film={screening} />
                <SynopsisStyled dangerouslySetInnerHTML={{ __html: screening.synopsis }} />
                <AuthorStyled>{screening.author}</AuthorStyled>
                {screening.serial && (
                    <SerialContainerStyled>
                        <hr />
                        Gezeigt im Rahmen der Filmreihe:{' '}
                        <SerialLinkStyled to={ROUTE_SERIAL + screening.serial.uuid}>
                            {screening.serial.title}
                        </SerialLinkStyled>
                    </SerialContainerStyled>
                )}
                {isUserEditor && (
                    <>
                        <hr />
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
                        <VerticalLineStyled> | </VerticalLineStyled>
                        {screening.billing ? (
                            <EditLinkStyled to={ROUTE_INTERN_EDIT_BILLING + screening.billing.uuid}>
                                Abrechnung bearbeiten
                            </EditLinkStyled>
                        ) : (
                            <EditLinkStyled to={ROUTE_INTERN_ADD_BILLING + screening.uuid}>
                                Abrechnung hinzufügen
                            </EditLinkStyled>
                        )}
                        <UpdateInfo entity={screening} />
                    </>
                )}
            </TextContainerStyled>
        </PageStyled>
    );
}

const ImageAndCopyrightContainerStyled = styled.div`
    position: relative;
    margin: 20px 0;
`;

const ImageContainerStyled = styled.div`
    position: relative;
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

    @media (max-width: 767px) {
        padding: 60px 10px 10px 10px;
    }
`;

const TitleStyled = styled.h2`
    display: inline-block;
    margin: 0 20px 0 0;
    color: var(--aka-gelb);
    font-size: 3em;

    @media (max-width: 767px) {
        font-size: 1.5em;
    }
`;

const FallbackTitleStyled = styled.h2`
    margin: 10px 0;
    padding: 0 20px;
    font-size: 2.1em;

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const TextContainerStyled = styled.div`
    padding: 0 20px;

    @media (max-width: 767px) {
        padding: 0;
    }
`;

const SpecialStyled = styled.div`
    margin: 10px -20px;
    padding: 5px 20px;
    background-color: var(--aka-gelb);
    font-weight: bold;
`;

const DateAndVenueStyled = styled.div`
    margin: 10px 0;
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

import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled, VerticalLineStyled } from '../common/styledElements';
import { AUTH_LEVEL_EDITOR, STORAGE_FOLDER } from '../constants';
import Context from '../Context';
import { formatToDateTimeString } from '../utils/dateFormatters';
import { getLastParameterFromPath } from '../utils/pathUtils';
import { getScreeningByUuid } from '../utils/screeningServices';
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

    if (noScreeningFound) return <Redirect to="/404" />;

    return (
        <PageStyled>
            {screening.image && <ImageStyled src={STORAGE_FOLDER + screening.image.path} />}
            <TitleStyled>{screening.title}</TitleStyled>
            <DateStyled>{formatToDateTimeString(screening.date)}</DateStyled>
            <InfoContainerStyled>
                <InfoValueStyled>{screening.country + ' ' + screening.year}</InfoValueStyled>
                <VerticalLineStyled> | </VerticalLineStyled>
                <InfoValueStyled>{screening.length} Min</InfoValueStyled>
                <VerticalLineStyled> | </VerticalLineStyled>
                <InfoValueStyled>{screening.medium}</InfoValueStyled>
                <VerticalLineStyled> | </VerticalLineStyled>
                <InfoValueStyled>{screening.version}</InfoValueStyled>
            </InfoContainerStyled>
            <CreditsContainerStyled>
                {screening.directed_by && (
                    <>
                        <CreditKeyStyled>Regie: </CreditKeyStyled>
                        <CreditValueStyled>{screening.directed_by}</CreditValueStyled>
                    </>
                )}
                {screening.written_by && (
                    <>
                        <VerticalLineStyled> | </VerticalLineStyled>
                        <CreditKeyStyled>Drehbuch: </CreditKeyStyled>
                        <CreditValueStyled>{screening.written_by}</CreditValueStyled>
                    </>
                )}
                {screening.music_by && (
                    <>
                        <VerticalLineStyled> | </VerticalLineStyled>
                        <CreditKeyStyled>Musik: </CreditKeyStyled>
                        <CreditValueStyled>{screening.music_by}</CreditValueStyled>
                    </>
                )}
                {screening.shot_by && (
                    <>
                        <VerticalLineStyled> | </VerticalLineStyled>
                        <CreditKeyStyled>Kamera: </CreditKeyStyled>
                        <CreditValueStyled>{screening.shot_by}</CreditValueStyled>
                    </>
                )}
                {screening.cast && (
                    <>
                        <VerticalLineStyled> | </VerticalLineStyled>
                        <CreditKeyStyled>Besetzung: </CreditKeyStyled>
                        <CreditValueStyled>{screening.cast}</CreditValueStyled>
                    </>
                )}
            </CreditsContainerStyled>
            <SynopsisStyled>{screening.synopsis}</SynopsisStyled>
            <AuthorStyled>{screening.author}</AuthorStyled>
            {screening.serial && (
                <SerialContainerStyled>
                    <HorizontalLineStyled />
                    Gezeigt im Rahmen der Filmreihe:{' '}
                    <SerialLinkStyled to={'/serial/' + screening.serial.uuid}>
                        {screening.serial.title}
                    </SerialLinkStyled>
                </SerialContainerStyled>
            )}
            {isAuthorized && (
                <>
                    <HorizontalLineStyled />
                    <EditLinkStyled to={'/intern/editScreening/' + screening.uuid}>
                        Vorführung bearbeiten
                    </EditLinkStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {screening.image ? (
                        <EditLinkStyled to={'/intern/editImage/' + screening.image.uuid}>
                            Bild bearbeiten
                        </EditLinkStyled>
                    ) : (
                        <EditLinkStyled to={'/intern/addImage/screening/' + screening.uuid}>
                            Bild hinzufügen
                        </EditLinkStyled>
                    )}
                </>
            )}
        </PageStyled>
    );
}

const ImageStyled = styled.img`
    width: 100%;
`;

const TitleStyled = styled.h2`
    margin: 10px 0;
    font-size: 2.1em;
`;

const DateStyled = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const InfoContainerStyled = styled.div`
    margin-bottom: 7px;
    font-size: 0.7em;
`;

const InfoValueStyled = styled.span``;

const CreditsContainerStyled = styled.div`
    font-size: 0.7em;
`;

const CreditKeyStyled = styled.span`
    font-weight: bold;
`;

const CreditValueStyled = styled.span`
    display: inline-block;
`;

const SynopsisStyled = styled.p`
    margin: 10px 0;
`;

const AuthorStyled = styled.div`
    font-style: italic;
`;

const SerialContainerStyled = styled.div``;

const SerialLinkStyled = styled(Link)`
    font-weight: bold;

    @media (max-width: 901px) {
        display: block;
    }
`;

const EditLinkStyled = styled(Link)``;

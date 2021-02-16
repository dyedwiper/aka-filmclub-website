import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLineStyled, PageStyled } from '../common/styledElements';
import { STORAGE_FOLDER } from '../constants';
import { formatDateAndTime } from '../utils/dateFormatters';
import { getScreeningByUuid } from '../utils/screeningServices';
import LoadingPage from './LoadingPage';

export default function ScreeningPage() {
    const [screening, setScreening] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [noScreeningFound, setNoScreeningFound] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;
        const screeningUuid = path.slice(path.lastIndexOf('/') + 1);
        getScreeningByUuid(screeningUuid).then((res) => {
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
            <ImageStyled src={STORAGE_FOLDER + screening.image.path} />
            <TitleStyled>{screening.title}</TitleStyled>
            <DateStyled>Spieltermin: {formatDateAndTime(screening.date)}</DateStyled>
            <InfoContainerStyled>
                <InfoValueStyled>{screening.country + ' ' + screening.year}</InfoValueStyled>
                <VertialLineStyled> | </VertialLineStyled>
                <InfoValueStyled>{screening.length} Min</InfoValueStyled>
                <VertialLineStyled> | </VertialLineStyled>
                <InfoValueStyled>{screening.medium}</InfoValueStyled>
                <VertialLineStyled> | </VertialLineStyled>
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
                        <VertialLineStyled> | </VertialLineStyled>
                        <CreditKeyStyled>Drehbuch: </CreditKeyStyled>
                        <CreditValueStyled>{screening.written_by}</CreditValueStyled>
                    </>
                )}
                {screening.music_by && (
                    <>
                        <VertialLineStyled> | </VertialLineStyled>
                        <CreditKeyStyled>Musik: </CreditKeyStyled>
                        <CreditValueStyled>{screening.music_by}</CreditValueStyled>
                    </>
                )}
                {screening.shot_by && (
                    <>
                        <VertialLineStyled> | </VertialLineStyled>
                        <CreditKeyStyled>Kamera: </CreditKeyStyled>
                        <CreditValueStyled>{screening.shot_by}</CreditValueStyled>
                    </>
                )}
                {screening.cast && (
                    <>
                        <VertialLineStyled> | </VertialLineStyled>
                        <CreditKeyStyled>Besetzung: </CreditKeyStyled>
                        <CreditValueStyled>{screening.cast}</CreditValueStyled>
                    </>
                )}
            </CreditsContainerStyled>
            <SynopsisStyled>{screening.synopsis}</SynopsisStyled>
            <AuthorStyled>Text: {screening.author}</AuthorStyled>
            {screening.serial && (
                <SerialContainerStyled>
                    <HorizontalLineStyled />
                    Gezeigt im Rahmen der Filmreihe:{' '}
                    <SerialLinkStyled to={'/serial/' + screening.serial.uuid}>
                        {screening.serial.title}
                    </SerialLinkStyled>
                </SerialContainerStyled>
            )}
        </PageStyled>
    );
}

const ImageStyled = styled.img`
    width: 100%;
`;

const TitleStyled = styled.h2``;

const DateStyled = styled.div`
    margin-bottom: 20px;
    font-weight: bold;
`;

const InfoContainerStyled = styled.div`
    margin-bottom: 20px;
`;

const InfoValueStyled = styled.span``;

const VertialLineStyled = styled.span`
    color: var(--aka-gelb);
    font-weight: bold;
`;

const CreditsContainerStyled = styled.div``;

const CreditKeyStyled = styled.span`
    font-weight: bold;
`;

const CreditValueStyled = styled.span`
    display: inline-block;
`;

const SynopsisStyled = styled.p``;

const AuthorStyled = styled.div`
    font-style: italic;
`;

const SerialContainerStyled = styled.div``;

const SerialLinkStyled = styled(Link)`
    font-weight: bold;
`;

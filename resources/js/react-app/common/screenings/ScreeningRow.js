import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import akaLogoGrau from '../../assets/aka_logo_grau.png';
import { ROUTE_SCREENING, ROUTE_SERIAL, STORAGE_FOLDER } from '../../constants';
import { formatToDateTimeStringWithWeekday } from '../../utils/dateFormatters';
import { stripHtml } from '../../utils/stringUtils';
import SupportingFilmsList from './SupportingFilmsList';

export default function ScreeningRow({ screening }) {
    return (
        <ScreeningRowStyled>
            <ScreeningContainerStyled>
                <LinkStyled to={ROUTE_SCREENING + screening.uuid}>
                    <ImageStyled
                        src={screening.image ? STORAGE_FOLDER + screening.image.path : akaLogoGrau}
                        alt={screening.image && screening.image.alt_text}
                    />
                </LinkStyled>
                <InfoContainerStyled>
                    <DateStyled>{formatToDateTimeStringWithWeekday(screening.date)}</DateStyled>
                    <LinkStyled to={ROUTE_SCREENING + screening.uuid}>
                        <TitleStyled>{screening.title}</TitleStyled>
                    </LinkStyled>
                    {screening.special && <SpecialStyled>{screening.special}</SpecialStyled>}
                    {screening.supporting_films.length > 0 && (
                        <SpecialStyled>
                            <SupportingFilmsList screening={screening} />
                        </SpecialStyled>
                    )}
                    {screening.serial && (
                        <SerialStyled>
                            Reihe: <Link to={ROUTE_SERIAL + screening.serial.uuid}>{screening.serial.title}</Link>
                        </SerialStyled>
                    )}
                    <SynopsisStyled>{stripHtml(screening.synopsis)}</SynopsisStyled>
                    <Link to={ROUTE_SCREENING + screening.uuid}>[mehr]</Link>
                </InfoContainerStyled>
            </ScreeningContainerStyled>
            <hr />
        </ScreeningRowStyled>
    );
}

const ScreeningRowStyled = styled.li`
    :last-child hr {
        display: none;
    }
`;

const ScreeningContainerStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 4fr);
    grid-gap: 20px;

    @media (max-width: 767px) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto;
    }
`;

const LinkStyled = styled(Link)``;

const ImageStyled = styled.img`
    width: 100%;
    max-height: 190px;
    object-fit: cover;

    @media (max-width: 767px) {
        max-height: initial;
    }
`;

const InfoContainerStyled = styled.div``;

const DateStyled = styled.div``;

const TitleStyled = styled.h3``;

const SpecialStyled = styled.div`
    max-width: 100%;
    width: max-content;
    margin: 5px 0 0 -10px;
    padding: 0 10px;
    background-color: var(--aka-gelb);
`;

const SerialStyled = styled.div`
    max-width: 100%;
    width: max-content;
    margin: 5px 0 0 -10px;
    padding: 0 10px;
    background-color: var(--aka-hellgrau);
`;

const SynopsisStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin-top: 10px;
`;

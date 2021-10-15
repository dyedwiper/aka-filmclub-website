import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import akaLogoGrau from '../../assets/aka_logo_grau.png';
import { ROUTE_SCREENING, STORAGE_FOLDER } from '../../constants';
import { formatToDateTimeStringWithWeekday } from '../../utils/dateFormatters';
import { stripHtml } from '../../utils/stringUtils';

export default function ScreeningCard({ screening }) {
    return (
        <ScreeningCardStyled>
            <Link to={ROUTE_SCREENING + screening.uuid}>
                <ImageContainerStyled>
                    <ImageStyled
                        src={screening.image ? STORAGE_FOLDER + screening.image.path : akaLogoGrau}
                        alt={screening.image && screening.image.alt_text}
                    />
                    <TitleStyled>{screening.title}</TitleStyled>
                </ImageContainerStyled>
            </Link>
            <DateStyled>{formatToDateTimeStringWithWeekday(screening.date)}</DateStyled>
            <SynopsisStyled>{stripHtml(screening.synopsis)}</SynopsisStyled>
            <Link to={ROUTE_SCREENING + screening.uuid}>[mehr]</Link>
        </ScreeningCardStyled>
    );
}

const ScreeningCardStyled = styled.li``;

const ImageContainerStyled = styled.div`
    position: relative;
    margin-bottom: 10px;

    &:hover img {
        filter: none;
    }
`;

const ImageStyled = styled.img`
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;

    @media (max-width: 767px) {
        height: initial;
    }
`;

const TitleStyled = styled.h3`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 20px 10px 10px 10px;
    color: var(--aka-gelb);
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`;

const DateStyled = styled.div`
    color: black;
    font-weight: bold;
`;

const SynopsisStyled = styled.div`
    margin: 10px 0 0 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`;

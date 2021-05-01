import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import akaLogoGrau from '../../assets/aka_logo_grau.png';
import { ROUTE_SCREENING, STORAGE_FOLDER } from '../../constants';
import { formatToDateTimeStringWithWeekday } from '../../utils/dateFormatters';
import { stripHtml } from '../../utils/stringUtils';

export default function ScreeningRow({ screening }) {
    return (
        <ScreeningRowStyled>
            <HorizontalRuleStyled />
            <ScreeningContainerStyled>
                <LinkStyled to={ROUTE_SCREENING + screening.uuid}>
                    <ImageStyled src={screening.image ? STORAGE_FOLDER + screening.image.path : akaLogoGrau} />
                </LinkStyled>
                <InfoContainerStyled>
                    <DateStyled>{formatToDateTimeStringWithWeekday(screening.date)}</DateStyled>
                    <LinkStyled to={ROUTE_SCREENING + screening.uuid}>
                        <TitleStyled>{screening.title}</TitleStyled>
                    </LinkStyled>
                    <SynopsisStyled>{stripHtml(screening.synopsis)}</SynopsisStyled>
                    <Link to={ROUTE_SCREENING + screening.uuid}>[mehr]</Link>
                </InfoContainerStyled>
            </ScreeningContainerStyled>
        </ScreeningRowStyled>
    );
}

const ScreeningRowStyled = styled.li``;

const HorizontalRuleStyled = styled.div`
    height: 10px;
    width: 80%;
    margin: 20px 0;
    background-color: var(--aka-gelb);
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
    object-fit: cover;
`;

const InfoContainerStyled = styled.div``;

const DateStyled = styled.div``;

const TitleStyled = styled.h3``;

const SynopsisStyled = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    margin-top: 10px;
`;

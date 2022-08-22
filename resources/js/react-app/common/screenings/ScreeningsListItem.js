import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_SCREENING } from '../../constants';
import { formatToDateTimeString, getWeekdayAbbreviation } from '../../utils/dateFormatters';

export default function ScreeningsListItem({ screening }) {
    return (
        <ScreeningsListItemStyled>
            <WeekdayStyled>{getWeekdayAbbreviation(screening.date)}</WeekdayStyled>
            <DateStyled>{formatToDateTimeString(screening.date)}</DateStyled>
            <LinkStyled to={ROUTE_SCREENING + screening.uuid}>
                {screening.title}
                {screening.special && <SpecialStyled>{screening.special}</SpecialStyled>}
                {!!screening.supporting_films && (
                    <SpecialStyled>
                        {screening.supporting_films.length === 1 ? 'mit Vorfilm' : 'mit Vorfilmen'}
                    </SpecialStyled>
                )}
            </LinkStyled>
        </ScreeningsListItemStyled>
    );
}

const ScreeningsListItemStyled = styled.li`
    margin: 5px 0;
`;
const WeekdayStyled = styled.div`
    display: inline-block;
    width: 27px;

    @media (max-width: 767px) {
        width: initial;
        margin-right: 5px;
    }
`;

const DateStyled = styled.div`
    display: inline-block;
    margin-right: 10px;
`;

const LinkStyled = styled(Link)`
    font-weight: bold;
    @media (max-width: 767px) {
        display: block;
    }
`;

const SpecialStyled = styled.span`
    margin-left: 5px;
    padding: 0 5px;
    background-color: var(--aka-gelb);
`;

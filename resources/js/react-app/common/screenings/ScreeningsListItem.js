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
                <TitleStyled>{screening.title}</TitleStyled>
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
    &:hover {
        color: var(--aka-gelb);
    }

    @media (max-width: 767px) {
        display: block;
    }
`;

const TitleStyled = styled.div`
    display: inline-block;
    font-weight: bold;
`;

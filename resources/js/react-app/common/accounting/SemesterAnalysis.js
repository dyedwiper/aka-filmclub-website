import React from 'react';
import styled from 'styled-components';
import { toEuroWithSymbol } from '../../utils/moneyFormatters';
import { VerticalLineStyled } from '../styledElements';

export default function SemesterAnalysis({ billings }) {
    return (
        <SemesterAnalysisStyled>
            <SubHeadlineStyled>Auswertung für das bisherige Semester</SubHeadlineStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Anzahl Vorführungen</KeyStyled>
                <ValueStyled>{billings.length}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled title="Verkaufte Eintrittskarten plus Freikarten">
                <KeyStyled>Mittlere Besuchszahl</KeyStyled>
                <ValueStyled>
                    {calculateAverageAdmissions(billings).toLocaleString('de-DE', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    })}
                </ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Verkaufte Tickets</KeyStyled>
                <ValueStyled>{calculateSemesterTicketsCount(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Verkaufte Ausweise</KeyStyled>
                <ValueStyled>{calculateSemesterPassesCount(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled title="Einnahmen aus Ticketverkauf minus Filmmieten und Nebenkosten">
                <KeyStyled>Bilanz</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(calculateSemesterBalance(billings))}</ValueStyled>
            </KeyValueContainerStyled>
            <SubSubHeadlineStyled>Auswertung nach Wochentagen</SubSubHeadlineStyled>
            <WeekdayListStyled>
                {getWeekdayValues(billings)
                    .filter((weekday) => weekday.numberOfScreenings > 0)
                    .map((weekday) => (
                        <WeekdayListItemStyled key={weekday.nameOfDay}>
                            <NameOfDayStyled>{weekday.nameOfDay}</NameOfDayStyled>
                            <VerticalLineStyled>|</VerticalLineStyled>
                            <WeekdayValueStyled>
                                {weekday.averageAdmissions.toLocaleString('de-DE', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                })}{' '}
                                &Oslash; Besuchis
                            </WeekdayValueStyled>
                            <VerticalLineStyled>|</VerticalLineStyled>
                            <WeekdayValueStyled>{weekday.numberOfScreenings + ' Vorführungen'}</WeekdayValueStyled>
                            <VerticalLineStyled>|</VerticalLineStyled>
                            <WeekdayValueStyled>{toEuroWithSymbol(weekday.balance) + ' Profit'}</WeekdayValueStyled>
                        </WeekdayListItemStyled>
                    ))}
            </WeekdayListStyled>
        </SemesterAnalysisStyled>
    );

    function calculateSemesterTicketsCount(billings) {
        let sum = 0;
        billings.forEach((billing) => {
            sum += billing.ticketsCount;
        });
        return sum;
    }

    function calculateSemesterPassesCount(billings) {
        let count = 0;
        billings.forEach((billing) => {
            count += billing.passesCount;
        });
        return count;
    }

    function calculateAverageAdmissions(billings) {
        let count = 0;
        billings.forEach((billing) => {
            count += billing.ticketsCount + billing.freeTickets;
        });
        return count / billings.length;
    }

    function calculateSemesterBalance(billings) {
        let sum = 0;
        billings.forEach((billing) => {
            sum += Number(billing.balance);
        });
        return sum;
    }

    function getWeekdayValues(billings) {
        const weekdayValues = [
            { nameOfDay: 'So', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
            { nameOfDay: 'Mo', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
            { nameOfDay: 'Di', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
            { nameOfDay: 'Mi', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
            { nameOfDay: 'Do', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
            { nameOfDay: 'Fr', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
            { nameOfDay: 'Sa', numberOfScreenings: 0, averageAdmissions: 0, balance: 0 },
        ];
        weekdayValues.forEach((weekdayValue) => {
            const weekdayBillings = billings.filter(
                (billing) => new Date(billing.screeningDate).getDay() === weekdayValues.indexOf(weekdayValue)
            );
            weekdayValue.numberOfScreenings = weekdayBillings.length;
            weekdayValue.averageAdmissions = calculateAverageAdmissions(weekdayBillings);
            weekdayValue.balance = calculateSemesterBalance(weekdayBillings);
        });
        return weekdayValues;
    }
}

const SemesterAnalysisStyled = styled.section``;

const SubHeadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const KeyValueContainerStyled = styled.div``;

const KeyStyled = styled.div`
    display: inline-block;
    width: 180px;
`;

const ValueStyled = styled.div`
    display: inline-block;
`;

const SubSubHeadlineStyled = styled.h4``;

const WeekdayListStyled = styled.ul``;

const WeekdayListItemStyled = styled.li`
    display: grid;
    grid-template-columns: 25px repeat(3, 5px 140px);
    grid-gap: 5px;
`;

const NameOfDayStyled = styled.div``;

const WeekdayValueStyled = styled.div`
    text-align: right;
`;

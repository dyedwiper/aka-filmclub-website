import React from 'react';
import styled from 'styled-components';
import { toEuroWithSymbol } from '../../utils/moneyUtils';
import { VerticalLineStyled } from '../styledElements';

export default function SemesterAnalysis({ billings }) {
    return (
        <SemesterAnalysisStyled>
            <SubHeadlineStyled>Auswertung für das bisherige Semester</SubHeadlineStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Anzahl Vorführungen</KeyStyled>
                <ValueStyled>{billings.length}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Mittlere Besuchszahl</KeyStyled>
                <ValueStyled>
                    {calculateAverageAdmissions(billings).toLocaleString('de-DE', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    }) + ' (Verkaufte Eintrittskarten plus Freikarten)'}
                </ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Verkaufte Tickets</KeyStyled>
                <ValueStyled>{calculateTicketsSum(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Verkaufte Ausweise</KeyStyled>
                <ValueStyled>{calculatePassesSum(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Bilanz</KeyStyled>
                <ValueStyled>
                    {toEuroWithSymbol(calculateBalance(billings))}
                    <ValueInfoStyled>(Einnahmen aus Ticketverkauf minus Filmmieten und Nebenkosten)</ValueInfoStyled>
                </ValueStyled>
            </KeyValueContainerStyled>
            <SubSubHeadlineStyled>Auswertung nach Wochentagen</SubSubHeadlineStyled>
            <WeekdayListStyled>
                {getWeekdayValues(billings)
                    .filter((weekday) => weekday.numberOfScreenings > 0)
                    .map((weekday) => (
                        <WeekdayListItemStyled key={weekday.nameOfDay}>
                            <NameOfDayStyled>{weekday.nameOfDay}</NameOfDayStyled>
                            <VerticalLineStyled>|</VerticalLineStyled>
                            <AverageAdmissionsStyled>
                                {weekday.averageAdmissions.toLocaleString('de-DE', {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                })}{' '}
                                &Oslash; Besuchis
                            </AverageAdmissionsStyled>
                            <VerticalLineStyled>|</VerticalLineStyled>
                            <NumberOfScreeningsStyled>
                                {weekday.numberOfScreenings + ' Vorführungen'}
                            </NumberOfScreeningsStyled>
                            <VerticalLineStyled>|</VerticalLineStyled>
                            <BalanceStyled>{toEuroWithSymbol(weekday.balance) + ' Profit'}</BalanceStyled>
                        </WeekdayListItemStyled>
                    ))}
            </WeekdayListStyled>
        </SemesterAnalysisStyled>
    );

    function calculateTicketsSum(billings) {
        let sum = 0;
        billings.forEach((billing) => {
            sum += billing.soldTickets;
        });
        return sum;
    }

    function calculatePassesSum(billings) {
        let sum = 0;
        billings.forEach((billing) => {
            sum += billing.soldPasses;
        });
        return sum;
    }

    function calculateAverageAdmissions(billings) {
        let sum = 0;
        billings.forEach((billing) => {
            sum += billing.soldTickets + billing.freeTickets;
        });
        return sum / billings.length;
    }

    function calculateBalance(billings) {
        let sum = 0;
        billings.forEach((billing) => {
            sum += Number(billing.profit);
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
            weekdayValue.balance = calculateBalance(weekdayBillings);
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

const ValueInfoStyled = styled.span`
    margin-left: 5px;
    font-weight: normal;
`;

const SubSubHeadlineStyled = styled.h4``;

const WeekdayListStyled = styled.ul``;

const WeekdayListItemStyled = styled.li`
    display: grid;
    grid-template-columns: 25px repeat(3, 5px 140px);
    grid-gap: 5px;
`;

const NameOfDayStyled = styled.div``;

const AverageAdmissionsStyled = styled.div`
    text-align: right;
`;

const NumberOfScreeningsStyled = styled.div`
    text-align: right;
`;

const BalanceStyled = styled.div`
    text-align: right;
`;

import React from 'react';
import styled from 'styled-components';
import {
    calculateAverageAdmissions,
    calculateSemesterBalance,
    calculateSemesterFreeTicketsCount,
    calculateSemesterPassesCount,
    calculateSemesterTicketsCount,
    getWeekdayValues,
} from '../../utils/admissionUtils';
import { toEuroWithSymbol } from '../../utils/moneyUtils';
import { VerticalLineStyled } from '../styledElements';

export default function SemesterAnalysis({ screenings, billings }) {
    return (
        <SemesterAnalysisStyled>
            <SubHeadlineStyled>Auswertung für das Semester</SubHeadlineStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Anzahl Vorführungen</KeyStyled>
                <ValueStyled>
                    {billings.length} (von {screenings.length})
                </ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Verkaufte Eintrittskarten</KeyStyled>
                <ValueStyled>{calculateSemesterTicketsCount(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Verkaufte Ausweise</KeyStyled>
                <ValueStyled>{calculateSemesterPassesCount(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Eingelöste Freikarten</KeyStyled>
                <ValueStyled>{calculateSemesterFreeTicketsCount(billings)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled title="Verkaufte Eintrittskarten plus eingelöste Freikarten">
                <KeyStyled>Mittlere Besuchszahl</KeyStyled>
                <ValueStyled>
                    {calculateAverageAdmissions(billings).toLocaleString('de-DE', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                    })}
                </ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled title="Einnahmen aus Ticketverkauf minus Filmmieten und Nebenkosten und sonstige Einnahmen/Ausgaben (ohne Mehrwertsteuer wegen Erstattung)">
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
}

const SemesterAnalysisStyled = styled.section``;

const SubHeadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const KeyValueContainerStyled = styled.div``;

const KeyStyled = styled.div`
    display: inline-block;
    width: 200px;
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

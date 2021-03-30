import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SemesterSelect from '../../common/SemesterSelect';
import { HorizontalRuleStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import { NUMBER_OF_SEEDS_IN_GHS_BIO } from '../../constants';
import Context from '../../Context';
import { formatToDateTimeString } from '../../utils/dateFormatters';
import { computeCurrentSemester } from '../../utils/semesterUtils';
import { getBillingsBySemester } from '../../utils/services/billingServices';

export default function AdmissionsPage() {
    const [billings, setBillings] = useState([]);
    const [semester, setSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        document.title = 'Besuchszahlen | aka-Filmclub';
        setPageTitle('Besuchszahlen');
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const semesterFromQuery = queryParams.get('semester');
        if (semesterFromQuery) {
            setSemester({ value: semesterFromQuery });
        } else {
            setSemester({ value: computeCurrentSemester() });
        }
    }, []);

    useEffect(() => {
        if (semester.value) {
            getBillingsBySemester(semester.value).then((res) => {
                history.push('/intern/admissions?semester=' + semester.value);
                setBillings(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {billings.length === 0 ? (
                        <NoScreeningsInfoStyled>In diesem Semester gab es keine Vorführungen.</NoScreeningsInfoStyled>
                    ) : (
                        <>
                            <ListStyled>
                                {billings.map((billing) => (
                                    <ListItemStyled key={billing.id}>
                                        <AdmissionsStyled>{billing.soldTickets + billing.freeTickets}</AdmissionsStyled>
                                        <PassesStyled>{'(' + billing.soldPasses + ')'}</PassesStyled>
                                        <ProfitStyled isNegative={billing.profit < 0}>
                                            {Number(billing.profit / 100).toLocaleString('de-DE', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}
                                        </ProfitStyled>
                                        <DiagramContainerStyled>
                                            <DiagramStyled admissions={billing.soldTickets + billing.freeTickets} />
                                        </DiagramContainerStyled>
                                        <DateStyled>{formatToDateTimeString(billing.screeningDate)}</DateStyled>
                                        <TitleLinkStyled to={'/screening/' + billing.screeningUuid}>
                                            {billing.screeningTitle}
                                        </TitleLinkStyled>
                                    </ListItemStyled>
                                ))}
                            </ListStyled>
                            <HorizontalRuleStyled />
                            <LegendStyled>
                                <SubHeadlineStyled>Legende</SubHeadlineStyled>
                                <LegendEntryStyled>1. Spalte: Verkaufte Eintrittskarten + Freikarten</LegendEntryStyled>
                                <LegendEntryStyled>2. Spalte: Verkaufte Ausweise</LegendEntryStyled>
                                <LegendEntryStyled>
                                    3. Spalte: Einnahmen aus Ticketverkauf minus Filmmiete und Nebenkosten
                                </LegendEntryStyled>
                            </LegendStyled>
                            <OverviewContainerStyled>
                                <SubHeadlineStyled>Auswertung für das Semester</SubHeadlineStyled>
                                <KeyValueContainerStyled>
                                    <KeyStyled>Mittlere Besuchszahl</KeyStyled>
                                    <ValueStyled>
                                        {calculateAverageAdmissions(billings).toLocaleString('de-DE', {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1,
                                        }) +
                                            ' bei ' +
                                            billings.length +
                                            ' Vorführungen'}
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
                                        {calculateBalance(billings).toLocaleString('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                        <ValueInfoStyled>
                                            (Einnahmen aus Ticketverkauf minus Filmmieten und Nebenkosten)
                                        </ValueInfoStyled>
                                    </ValueStyled>
                                </KeyValueContainerStyled>
                                <SubSubHeadlineStyled>Auswertung nach Wochentagen</SubSubHeadlineStyled>
                                <WeekdayListStyled>
                                    {getWeekdayValues(billings)
                                        .filter((weekday) => weekday.numberOfScreenings > 0)
                                        .map((weekday) => (
                                            <WeekdayListItemStyled key={weekday.nameOfDay}>
                                                <NameOfDayStyled>{weekday.nameOfDay}</NameOfDayStyled>
                                                <AverageAdmissionsStyled>
                                                    {weekday.averageAdmissions.toLocaleString('de-DE', {
                                                        minimumFractionDigits: 1,
                                                        maximumFractionDigits: 1,
                                                    })}
                                                </AverageAdmissionsStyled>
                                                <NumberOfScreeningsStyled>
                                                    {weekday.numberOfScreenings}
                                                </NumberOfScreeningsStyled>
                                                <BalanceStyled>
                                                    {weekday.balance.toLocaleString('de-DE', {
                                                        style: 'currency',
                                                        currency: 'EUR',
                                                    })}
                                                </BalanceStyled>
                                            </WeekdayListItemStyled>
                                        ))}
                                </WeekdayListStyled>
                            </OverviewContainerStyled>
                        </>
                    )}
                </>
            )}
        </PageStyled>
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
            sum += Number(billing.profit) / 100;
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

const NoScreeningsInfoStyled = styled.div`
    margin-top: 20px;
    color: var(--aka-red);
`;

const ListStyled = styled.ul``;

const ListItemStyled = styled.li``;

const AdmissionsStyled = styled.div`
    display: inline-block;
    width: 30px;
    margin-right: 5px;
    text-align: right;
    font-weight: bold;
`;

const PassesStyled = styled.div`
    display: inline-block;
    width: 40px;
    margin-right: 10px;
    text-align: right;
`;

const ProfitStyled = styled.div`
    display: inline-block;
    width: 80px;
    margin-right: 10px;
    text-align: right;
    font-weight: bold;
    color: ${(props) => props.isNegative && 'var(--aka-red)'};
`;

const DiagramContainerStyled = styled.div`
    display: inline-block;
    width: 150px;
    margin-right: 10px;
`;

const DiagramStyled = styled.div`
    width: ${(props) => (props.admissions / NUMBER_OF_SEEDS_IN_GHS_BIO) * 100 + '%'};
    height: 10px;
    background-color: var(--aka-gelb);
`;

const DateStyled = styled.div`
    display: inline-block;
    margin-right: 10px;
`;

const TitleLinkStyled = styled(Link)`
    display: inline-block;
    max-width: 300px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // The alignment must be set here, see https://stackoverflow.com/questions/9273016.
    vertical-align: bottom;
`;

const LegendStyled = styled.section``;

const SubHeadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const LegendEntryStyled = styled.div``;

const OverviewContainerStyled = styled.section``;

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

const WeekdayListItemStyled = styled.li``;

const NameOfDayStyled = styled.div`
    display: inline-block;
    width: 30px;
`;

const AverageAdmissionsStyled = styled.div`
    display: inline-block;
    width: 60px;
    text-align: right;
`;

const NumberOfScreeningsStyled = styled.div`
    display: inline-block;
    width: 60px;
    text-align: right;
`;

const BalanceStyled = styled.div`
    display: inline-block;
    width: 100px;
    text-align: right;
`;

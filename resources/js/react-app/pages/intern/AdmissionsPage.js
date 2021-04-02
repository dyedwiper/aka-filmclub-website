import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AdmissionListItem from '../../common/accounting/AdmissionListItem';
import SemesterAnalysis from '../../common/accounting/SemesterAnalysis';
import SemesterSelect from '../../common/SemesterSelect';
import { HorizontalRuleStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { computeCurrentSemester } from '../../utils/semesterUtils';
import { getScreeningsWithBillingsBySemester } from '../../utils/services/billingServices';

export default function AdmissionsPage() {
    const [screenings, setScreenings] = useState([]);
    const [semester, setSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        document.title = 'Besuchizahlen | aka-Filmclub';
        setPageTitle('Besuchizahlen');
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
            getScreeningsWithBillingsBySemester(semester.value).then((res) => {
                history.push('/intern/admissions?semester=' + semester.value);
                setScreenings(res.data);
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
                    {screenings.length === 0 ? (
                        <NoScreeningsInfoStyled>In diesem Semester gab es keine Vorführungen.</NoScreeningsInfoStyled>
                    ) : (
                        <>
                            <ListStyled>
                                {screenings.map((screening) => (
                                    <AdmissionListItem key={screening.id} screening={screening} />
                                ))}
                            </ListStyled>
                            <HorizontalRuleStyled />
                            <LegendStyled>
                                <SubHeadlineStyled>Legende</SubHeadlineStyled>
                                <LegendEntryStyled>
                                    1. Spalte: Verkaufte Eintrittskarten plus Freikarten
                                </LegendEntryStyled>
                                <LegendEntryStyled>2. Spalte: Verkaufte Ausweise</LegendEntryStyled>
                                <LegendEntryStyled>
                                    3. Spalte: Einnahmen aus Ticketverkauf minus Filmmiete und Nebenkosten
                                </LegendEntryStyled>
                            </LegendStyled>
                            <HorizontalRuleStyled />
                            <SemesterAnalysis
                                billings={screenings
                                    .filter((screening) => screening.billing)
                                    .map((screening) => {
                                        return { ...screening.billing, screeningDate: screening.date };
                                    })}
                            />
                        </>
                    )}
                </>
            )}
        </PageStyled>
    );
}

const NoScreeningsInfoStyled = styled.div`
    margin-top: 20px;
    color: var(--aka-red);
`;

const ListStyled = styled.ul``;

const LegendStyled = styled.section``;

const SubHeadlineStyled = styled.h3`
    margin: 20px 0 10px 0;
`;

const LegendEntryStyled = styled.div``;

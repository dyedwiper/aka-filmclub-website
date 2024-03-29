import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AdmissionListItem from '../../common/accounting/AdmissionListItem';
import BillingsCsvLink from '../../common/accounting/BillingsCsvLink';
import SemesterAnalysis from '../../common/accounting/SemesterAnalysis';
import BasePage from '../../common/BasePage';
import SemesterSelect from '../../common/forms/SemesterSelect';
import { PageHeadlineStyled } from '../../common/styledElements';
import { PAGE_TITLE_ADMISSIONS } from '../../constants';
import Context from '../../Context';
import { getScreeningsWithBillingsBySemester } from '../../services/billingServices';

export default function AdmissionsPage() {
    const [screenings, setScreenings] = useState([]);
    const [semester, setSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { isUserEditor, currentSemester } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const semesterFromQuery = queryParams.get('semester');
        if (semesterFromQuery) {
            setSemester({ value: semesterFromQuery });
        } else {
            setSemester({ value: currentSemester.name });
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
        <BasePage pageTitle={PAGE_TITLE_ADMISSIONS}>
            <PageHeadlineStyled>{PAGE_TITLE_ADMISSIONS}</PageHeadlineStyled>
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
                                    <AdmissionListItem
                                        key={screening.id}
                                        screening={screening}
                                        isUserEditor={isUserEditor}
                                    />
                                ))}
                            </ListStyled>
                            <hr />
                            <SemesterAnalysis
                                screenings={screenings}
                                billings={screenings
                                    .filter((screening) => screening.billing)
                                    .map((screening) => {
                                        return { ...screening.billing, screeningDate: screening.date };
                                    })}
                            />
                            <hr />
                            <BillingsCsvLink screenings={screenings} semester={semester} />
                        </>
                    )}
                </>
            )}
        </BasePage>
    );
}

const NoScreeningsInfoStyled = styled.div`
    margin-top: 20px;
    color: var(--aka-red);
`;

const ListStyled = styled.ul``;

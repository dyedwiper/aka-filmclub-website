import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SemesterSelect from '../../common/SemesterSelect';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
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
                console.log(res.data);
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
                <ListStyled>
                    {billings.map((billing) => (
                        <ListItemStyled key={billing.id}>
                            <AdmissionsStyled>{billing.tickets}</AdmissionsStyled>
                            <TitleStyled>{billing.title}</TitleStyled>
                        </ListItemStyled>
                    ))}
                </ListStyled>
            )}
        </PageStyled>
    );
}

const ListStyled = styled.ul``;

const ListItemStyled = styled.li``;

const AdmissionsStyled = styled.span``;

const TitleStyled = styled.span``;

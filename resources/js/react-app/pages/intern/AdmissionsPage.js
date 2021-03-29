import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SemesterSelect from '../../common/SemesterSelect';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import { NUMBER_OF_SEEDS_IN_GHS_BIO } from '../../constants';
import Context from '../../Context';
import { formatToDateString } from '../../utils/dateFormatters';
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
                <ListStyled>
                    {billings.map((billing) => (
                        <ListItemStyled key={billing.id}>
                            <AdmissionsStyled>{billing.soldTickets + billing.freeTickets}</AdmissionsStyled>
                            <PassesStyled>{'(' + billing.soldPasses + ')'}</PassesStyled>
                            <ProfitStyled isNegative={billing.profit < 0}>{billing.profit + ' €'}</ProfitStyled>
                            <DiagramContainerStyled>
                                <DiagramStyled admissions={billing.soldTickets + billing.freeTickets} />
                            </DiagramContainerStyled>
                            <DateStyled>{formatToDateString(billing.screeningDate)}</DateStyled>
                            <TitleLinkStyled to={'/screening/' + billing.screeningUuid}>
                                {billing.screeningTitle}
                            </TitleLinkStyled>
                        </ListItemStyled>
                    ))}
                </ListStyled>
            )}
        </PageStyled>
    );
}

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
    width: 70px;
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
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
`;

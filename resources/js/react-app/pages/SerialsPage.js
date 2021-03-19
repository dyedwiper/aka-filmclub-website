import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../common/SearchBar';
import SemesterSelect from '../common/SemesterSelect';
import SerialRow from '../common/SerialRow';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { computeCurrentSemester } from '../utils/semesterUtils';
import { getSerialsBySemester, getSerialsBySearchString } from '../utils/serialServices';

export default function SerialsPage() {
    const [serials, setSerials] = useState([]);
    // The semester and search states are stored in an object,
    // so that also a setting of state with an unchanged value is recognized as an update.
    const [semester, setSemester] = useState({});
    const [search, setSearch] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { setPageTitle } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        document.title = 'Filmreihen | aka-Filmclub';
        setPageTitle('Filmreihen');
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchFromQuery = queryParams.get('search');
        const semesterFromQuery = queryParams.get('semester');
        // It is only possible to search by string or semester, not by both at the same time.
        if (searchFromQuery) {
            setSearch({ value: searchFromQuery });
        } else if (semesterFromQuery) {
            setSemester({ value: semesterFromQuery });
        } else {
            setSemester({ value: computeCurrentSemester() });
        }
    }, []);

    useEffect(() => {
        if (semester.value) {
            getSerialsBySemester(semester.value).then((res) => {
                history.push('/program/serials?semester=' + semester.value);
                setSerials(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    useEffect(() => {
        if (search.value) {
            getSerialsBySearchString(search.value).then((res) => {
                history.push('/program/serials?search=' + search.value);
                setSerials(res.data);
                setIsLoading(false);
            });
        }
    }, [search]);

    return (
        <PageStyled>
            <PageHeadlineStyled>Filmreihen</PageHeadlineStyled>
            <FormsContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </FormsContainerStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ListStyled>
                    {serials.map((serial) => (
                        <SerialRow key={serial.id} serial={serial} />
                    ))}
                </ListStyled>
            )}
        </PageStyled>
    );
}

const FormsContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 280px 1fr;
    column-gap: 40px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`;

const ListStyled = styled.ul``;

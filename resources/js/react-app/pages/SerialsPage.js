import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../common/SearchBar';
import SemesterSelect from '../common/SemesterSelect';
import SerialRow from '../common/SerialRow';
import { ArchiveSearchContainerStyled, PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { computeCurrentSemester } from '../utils/semesterUtils';
import { getSerialsBySemester, getSerialsBySearchString } from '../utils/services/serialServices';

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
            <ArchiveSearchContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </ArchiveSearchContainerStyled>
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

const ListStyled = styled.ul``;

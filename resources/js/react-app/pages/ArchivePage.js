import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import SearchBar from '../common/SearchBar';
import SemesterSelect from '../common/SemesterSelect';
import { ArchiveSearchContainerStyled, PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getScreeningsBySearchString, getScreeningsBySemester } from '../utils/screeningServices';
import { computeCurrentSemester } from '../utils/semesterUtils';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    // The semester and search states are stored in an object,
    // so that also a setting of state with an unchanged value is recognized as an update.
    const [semester, setSemester] = useState({});
    const [search, setSearch] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { setPageTitle } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub';
        setPageTitle('Archiv');
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
            getScreeningsBySemester(semester.value).then((res) => {
                history.push('/program/archive?semester=' + semester.value);
                setScreenings(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    useEffect(() => {
        if (search.value) {
            getScreeningsBySearchString(search.value).then((res) => {
                history.push('/program/archive?search=' + search.value);
                setScreenings(res.data);
                setIsLoading(false);
            });
        }
    }, [search]);

    return (
        <PageStyled>
            <PageHeadlineStyled>Programmarchiv</PageHeadlineStyled>
            <ArchiveSearchContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </ArchiveSearchContainerStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ListStyled>
                    {screenings.map((screening) => (
                        <ScreeningsListItem key={screening.id} screening={screening} />
                    ))}
                </ListStyled>
            )}
        </PageStyled>
    );
}

const ListStyled = styled.ul``;

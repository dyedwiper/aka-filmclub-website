import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import SearchBar from '../common/forms/SearchBar';
import SemesterSelect from '../common/forms/SemesterSelect';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { ArchiveSearchContainerStyled, PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_ARCHIVE } from '../constants';
import { computeCurrentSemester } from '../utils/semesterUtils';
import { getScreeningsBySearchString, getScreeningsBySemester } from '../utils/services/screeningServices';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    // The semester and search states are stored in an object,
    // so that also a setting of state with an unchanged value is recognized as an update.
    const [semester, setSemester] = useState({});
    const [search, setSearch] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let history = useHistory();

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
        <BasePage title={PAGE_TITLE_ARCHIVE}>
            <PageHeadlineStyled>{PAGE_TITLE_ARCHIVE}</PageHeadlineStyled>
            <ArchiveSearchContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </ArchiveSearchContainerStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ListStyled>
                    {screenings
                        .filter((screening) => new Date(screening.date) < Date.now())
                        .map((screening) => (
                            <ScreeningsListItem key={screening.id} screening={screening} />
                        ))}
                </ListStyled>
            )}
        </BasePage>
    );
}

const ListStyled = styled.ul``;

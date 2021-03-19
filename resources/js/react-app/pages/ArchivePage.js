import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import SearchBar from '../common/SearchBar';
import SemesterSelect from '../common/SemesterSelect';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getScreeningsBySearchString, getScreeningsBySemester } from '../utils/screeningServices';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    const [semester, setSemester] = useState('');
    // The search state is stored in an object,
    // so that also a search with an unchanged value is recognized as a state update.
    // A changed string would not be recognized.
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
            setSemester(semesterFromQuery);
        }
    }, []);

    // The useEffect-hook for semester must be above the hook for search.
    // Otherwise the semester select overwrites the search.
    // This is not ideal but I haven't found a nicer solution.
    useEffect(() => {
        if (semester) {
            getScreeningsBySemester(semester).then((res) => {
                history.push('/program/archive?semester=' + semester);
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
            <FormsContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </FormsContainerStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <ScreeningsListStyled>
                    {screenings.map((screening) => (
                        <ScreeningsListItem key={screening.id} screening={screening} />
                    ))}
                </ScreeningsListStyled>
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

const ScreeningsListStyled = styled.ul``;

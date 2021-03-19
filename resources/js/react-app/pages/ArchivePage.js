import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import SemesterSelect from '../common/SemesterSelect';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getScreeningsBySearchString, getScreeningsBySemester } from '../utils/screeningServices';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    const [semester, setSemester] = useState('');
    const [search, setSearch] = useState('');
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
            setSearch(searchFromQuery);
        } else if (semesterFromQuery) {
            setSemester(semesterFromQuery);
        }
    }, []);

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
        if (search) {
            getScreeningsBySearchString(search).then((res) => {
                history.push('/program/archive?search=' + search);
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
                <SearchFormStyled onSubmit={handleSubmit}>
                    <SearchLabelStyled>
                        Suchbegriff:
                        <SearchInputStyled name="search" defaultValue={search} />
                    </SearchLabelStyled>
                    <SearchButtonStyled type="submit">Suchen</SearchButtonStyled>
                </SearchFormStyled>
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

    function handleSubmit(event) {
        event.preventDefault();
        setSearch(event.target.search.value);
    }
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

const SearchFormStyled = styled.form``;

const SearchLabelStyled = styled.label``;

const SearchInputStyled = styled.input`
    width: 150px;
    margin-left: 20px;
`;

const SearchButtonStyled = styled.button`
    margin-left: 20px;
`;

const ScreeningsListStyled = styled.ul``;

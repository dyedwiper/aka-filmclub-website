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
    const [isLoading, setIsLoading] = useState(true);

    const { setPageTitle } = useContext(Context);

    let history = useHistory();

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub';
        setPageTitle('Archiv');
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const search = queryParams.get('search');
        const semester = queryParams.get('semester');
        if (search) {
            getScreeningsBySearchString(search).then((res) => {
                setScreenings(res.data);
            });
        } else if (semester) {
            setSemester(semester);
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

    return (
        <PageStyled>
            <PageHeadlineStyled>Programmarchiv</PageHeadlineStyled>
            <FormsContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchFormStyled onSubmit={handleSubmit}>
                    <SearchLabelStyled>
                        Suchbegriff:
                        <SearchInputStyled name="search" />
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
        const searchString = event.target.search.value;
        getScreeningsBySearchString(searchString).then((res) => {
            setScreenings(res.data);
            history.push('/program/archive?search=' + searchString);
        });
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

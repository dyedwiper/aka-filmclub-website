import React, { useContext, useEffect, useState } from 'react';
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

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub';
        setPageTitle('Archiv');
    }, []);

    useEffect(() => {
        if (semester) {
            getScreeningsBySemester(semester).then((res) => {
                setScreenings(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    return (
        <PageStyled>
            <PageHeadlineStyled>Programmarchiv</PageHeadlineStyled>
            <FormsContainerStyled>
                <SemesterSelect setSemester={setSemester} setIsLoading={setIsLoading} />
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

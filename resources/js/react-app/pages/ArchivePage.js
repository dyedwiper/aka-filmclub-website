import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Context from '../Context';
import BasePage from '../common/BasePage';
import SearchBar from '../common/forms/SearchBar';
import SemesterSelect from '../common/forms/SemesterSelect';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import { ArchiveSearchContainerStyled, PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_ARCHIVE, ROUTE_ARCHIVE } from '../constants';
import { getScreeningsBySearchString, getScreeningsBySemester } from '../services/screeningServices';
import { computeSemesterOptions } from '../utils/semesterUtils';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    // The semester and search states are stored in an object,
    // so that also a setting of state with an unchanged value is recognized as an update.
    const [semester, setSemester] = useState({});
    const [search, setSearch] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { currentSemester } = useContext(Context);

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
            setSemester({ value: currentSemester.name });
        }
    }, []);

    useEffect(() => {
        if (semester.value) {
            getScreeningsBySemester(semester.value).then((res) => {
                history.push('/program/archive?semester=' + semester.value);
                const screenings = res.data.filter(
                    (screening) => new Date(screening.date.replace(' ', 'T')) < Date.now(),
                );
                setScreenings(screenings);
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
        <BasePage pageTitle={PAGE_TITLE_ARCHIVE}>
            <PageHeadlineStyled>{PAGE_TITLE_ARCHIVE}</PageHeadlineStyled>
            <ArchiveSearchContainerStyled>
                <SemesterSelect semester={semester} setSemester={setSemester} setIsLoading={setIsLoading} />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </ArchiveSearchContainerStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <>
                    {!screenings.length && <NoItemsHint>In jenem Semester gab es keine Vorführungen.</NoItemsHint>}
                    <ListStyled>
                        {screenings.map((screening) => (
                            <ScreeningsListItem key={screening.id} screening={screening} />
                        ))}
                    </ListStyled>
                </>
            )}
            {/* These hidden links are for search engine crawlers, so they can reach each year's site in the archive.
            Unfortunately they can't reach the sites through the semester select.*/}
            <HiddenLinksStyled>
                {computeSemesterOptions({}).map((semester) => (
                    <Link key={semester.value} to={ROUTE_ARCHIVE + '?semester=' + semester.value}></Link>
                ))}
            </HiddenLinksStyled>
        </BasePage>
    );
}

const ListStyled = styled.ul``;

const NoItemsHint = styled.p`
    margin-top: 20px;
`;

const HiddenLinksStyled = styled.div``;

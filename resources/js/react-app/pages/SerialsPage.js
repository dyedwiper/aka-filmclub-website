import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import SearchBar from '../common/forms/SearchBar';
import SemesterSelect from '../common/forms/SemesterSelect';
import SerialRow from '../common/misc/SerialRow';
import { ArchiveSearchContainerStyled, PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_SERIALS } from '../constants';
import Context from '../Context';
import { getSerialsBySearchString, getSerialsBySemester } from '../services/serialServices';

export default function SerialsPage() {
    const [serials, setSerials] = useState([]);
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
        <BasePage pageTitle={PAGE_TITLE_SERIALS}>
            <PageHeadlineStyled>{PAGE_TITLE_SERIALS}</PageHeadlineStyled>
            <ArchiveSearchContainerStyled>
                <SemesterSelect
                    semester={semester}
                    setSemester={setSemester}
                    setIsLoading={setIsLoading}
                    isIncludingNextSemester={true}
                />
                <SearchBar search={search} setSearch={setSearch} setIsLoading={setIsLoading} />
            </ArchiveSearchContainerStyled>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <>
                    {!serials.length && (
                        <NoItemsHint>In diesem Semester gibt oder gab es keine Filmreihen.</NoItemsHint>
                    )}

                    <ListStyled>
                        {serials.map((serial) => (
                            <SerialRow key={serial.id} serial={serial} />
                        ))}
                    </ListStyled>
                </>
            )}
        </BasePage>
    );
}

const ListStyled = styled.ul``;

const NoItemsHint = styled.p`
    margin-top: 20px;
`;

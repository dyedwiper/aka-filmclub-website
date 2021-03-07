import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import SemesterSelect from '../common/SemesterSelect';
import { PageHeadlineStyled, PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getScreeningsBySemester } from '../utils/screeningServices';

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
            <SemesterSelect setSemester={setSemester} setIsLoading={setIsLoading} />
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

const ScreeningsListStyled = styled.ul``;

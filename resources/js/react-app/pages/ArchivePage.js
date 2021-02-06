import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningsListItem from '../common/screenings/ScreeningsListItem';
import SemesterSelect from '../common/SemesterSelect';
import { PageStyled } from '../common/styledElements';
import { getScreeningsBySemester } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function ArchivePage() {
    const [screenings, setScreenings] = useState([]);
    const [semester, setSemester] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'Archiv | aka-Filmclub ';
    }, []);

    useEffect(() => {
        if (semester.year) {
            getScreeningsBySemester(semester).then((res) => {
                setScreenings(res.data);
                setIsLoading(false);
            });
        }
    }, [semester]);

    return (
        <PageStyled>
            <HeadlineStyled>Programmarchiv</HeadlineStyled>
            <SemesterSelect setSemester={setSemester} />
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

const HeadlineStyled = styled.h2``;

const ScreeningsListStyled = styled.ul``;

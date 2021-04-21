import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasePage from '../common/BasePage';
import ScreeningRow from '../common/screenings/ScreeningRow';
import { PageHeadlineStyled } from '../common/styledElements';
import { PAGE_TITLE_PROGRAM } from '../constants';
import { getFutureScreenings } from '../utils/services/screeningServices';
import LoadingPage from './LoadingPage';

export default function ProgramPage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFutureScreenings().then((res) => {
            setScreenings(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_PROGRAM}>
            <PageHeadlineStyled>{PAGE_TITLE_PROGRAM}</PageHeadlineStyled>
            <ScreeningsListStyled>
                {screenings.map((screening) => (
                    <ScreeningRow key={screening.id} screening={screening} />
                ))}
            </ScreeningsListStyled>
        </BasePage>
    );
}

const ScreeningsListStyled = styled.ul`
    padding: 0;
    list-style: none;
`;

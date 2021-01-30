import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningRow from '../common/screenings/ScreeningRow';
import { PageStyled } from '../common/styledElements';
import { getScreenings } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function ProgramPage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getScreenings().then((res) => {
            setScreenings(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <HeadlineStyled>Programm</HeadlineStyled>
            <ScreeningsListStyled>
                {screenings.map((screening) => (
                    <ScreeningRow key={screening.id} screening={screening} />
                ))}
            </ScreeningsListStyled>
        </PageStyled>
    );
}

const HeadlineStyled = styled.h2``;

const ScreeningsListStyled = styled.ul`
    padding: 0;
    list-style: none;
`;

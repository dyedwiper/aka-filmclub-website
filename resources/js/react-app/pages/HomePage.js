import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningCard from '../common/screenings/ScreeningCard';
import ScreeningSlide from '../common/screenings/ScreeningSlide';
import { PageStyled } from '../common/styledElements';
import { getScreenings } from '../utils/screeningServices';
import LoadingPage from './LoadingPage';

export default function HomePage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'aka-Filmclub ';
    }, []);

    useEffect(() => {
        getScreenings().then((res) => {
            setScreenings(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <ScreeningSlide key={screenings[0].id} screening={screenings[0]} />
            <ScreeningCardsRowStyled>
                {screenings.map((screening) => (
                    <ScreeningCard key={screening.id} screening={screening} />
                ))}
            </ScreeningCardsRowStyled>
        </PageStyled>
    );
}

const ScreeningCardsRowStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
    background-color: deeppink;
`;

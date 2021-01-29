import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningCard from '../common/ScreeningCard';
import ScreeningSlide from '../common/ScreeningSlide';
import { getScreenings } from '../utils/services';
import LoadingPage from './LoadingPage';

export default function HomePage() {
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
        <HomePageStyled>
            <ScreeningSlide key={screenings[0].id} screening={screenings[0]} />
            <ScreeningCardsRowStyled>
                {screenings.map((screening) => (
                    <ScreeningCard key={screening.id} screening={screening} />
                ))}
            </ScreeningCardsRowStyled>
        </HomePageStyled>
    );
}

const HomePageStyled = styled.div`
    padding: 160px 100px;
`;

const ScreeningCardsRowStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
    background-color: deeppink;
`;

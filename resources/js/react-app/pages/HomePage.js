import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningSlide from '../common/ScreeningSlide';
import { getScreenings } from '../utils/services';

export default function HomePage() {
    const [screenings, setScreenings] = useState([]);

    useEffect(() => {
        getScreenings().then((res) => {
            setScreenings(res.data);
        });
    }, []);

    return (
        <HomePageStyled>
            {screenings.map((screening) => (
                <ScreeningSlide key={screening.id} screening={screening} />
            ))}
        </HomePageStyled>
    );
}

const HomePageStyled = styled.div`
    padding-top: 160px;
`;

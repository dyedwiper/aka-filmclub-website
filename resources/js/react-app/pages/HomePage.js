import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
                <div key={screening.id}>{screening.title}</div>
            ))}
        </HomePageStyled>
    );
}

const HomePageStyled = styled.div`
    padding-top: 100px;
`;

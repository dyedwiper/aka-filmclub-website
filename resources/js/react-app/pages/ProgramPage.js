import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ScreeningRow from '../common/screenings/ScreeningRow';
import { PageStyled } from '../common/styledElements';
import Context from '../Context';
import { getFutureScreenings } from '../utils/screeningServices';
import LoadingPage from './LoadingPage';

export default function ProgramPage() {
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { setPageTitle } = useContext(Context);

    useEffect(() => {
        document.title = 'Programm | aka-Filmclub';
        setPageTitle('Programm');
    }, []);

    useEffect(() => {
        getFutureScreenings().then((res) => {
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

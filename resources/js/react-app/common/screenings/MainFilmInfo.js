import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_SCREENING } from '../../constants';

export default function MainFilmInfo({ screening }) {
    if (!screening.main_film) return <></>;

    return (
        <MainFilmInfoStyled>
            {'Vorfilm zu: '}
            <Link to={ROUTE_SCREENING + screening.main_film.uuid}>{screening.main_film.title}</Link>
        </MainFilmInfoStyled>
    );
}

const MainFilmInfoStyled = styled.div`
    margin: 10px -20px;
    padding: 5px 20px;
    background-color: var(--aka-gelb);
    font-weight: bold;
`;

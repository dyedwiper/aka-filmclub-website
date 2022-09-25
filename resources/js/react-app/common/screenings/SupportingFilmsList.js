import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_SCREENING } from '../../constants';

export default function SupportingFilmsList({ screening }) {
    return (
        <>
            {screening.supporting_films.length === 1 ? 'Vorfilm: ' : 'Vorfilme: '}
            <ListStyled>
                {screening.supporting_films.map((film) => (
                    <ListItemStyled key={film.uuid}>
                        <Link to={ROUTE_SCREENING + film.uuid}>{film.title}</Link>
                        <span>, </span>
                    </ListItemStyled>
                ))}
            </ListStyled>
        </>
    );
}

const ListStyled = styled.ul`
    display: inline;
`;

const ListItemStyled = styled.li`
    display: inline;

    :last-child span {
        display: none;
    }
`;

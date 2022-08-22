import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_SCREENING } from '../../constants';

export default function SupportingFilmsInfo({ screening }) {
    if (!screening.supporting_films.length) return <></>;

    return (
        <SupportingFilmsInfoStyled>
            {screening.supporting_films.length === 1 ? 'Vorfilm: ' : 'Vorfilme: '}
            <ListStyled>
                {screening.supporting_films.map((film) => (
                    <ListItemStyled key={film.id}>
                        <Link to={ROUTE_SCREENING + film.uuid}>{film.title}</Link>
                        <span>, </span>
                    </ListItemStyled>
                ))}
            </ListStyled>
        </SupportingFilmsInfoStyled>
    );
}

const SupportingFilmsInfoStyled = styled.div`
    margin: 10px -20px;
    padding: 5px 20px;
    background-color: var(--aka-gelb);
    font-weight: bold;
`;

const ListStyled = styled.ul`
    display: inline;
`;

const ListItemStyled = styled.li`
    display: inline;

    :last-child span {
        display: none;
    }
`;

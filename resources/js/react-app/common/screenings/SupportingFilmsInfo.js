import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_SCREENING } from '../../constants';

export default function SupportingFilmsInfo({ screening }) {
    if (!screening.supporting_films.length) return <></>;

    return (
        <SupportingFilmsInfoStyled>
            <hr />
            <HintStyled>
                {screening.supporting_films.length === 1
                    ? 'Vor dem Hauptfilm läuft folgender Vorfilm: '
                    : 'Vor dem Hauptfilm laufen folgende Vorfilme: '}
            </HintStyled>
            <ListStyled>
                {screening.supporting_films.map((film) => (
                    <ListItemStyled key={film.id}>
                        <Link to={ROUTE_SCREENING + film.uuid}>{film.title}</Link>
                    </ListItemStyled>
                ))}
            </ListStyled>
        </SupportingFilmsInfoStyled>
    );
}

const SupportingFilmsInfoStyled = styled.div``;

const HintStyled = styled.div``;

const ListStyled = styled.ul`
    margin: 0;
`;

const ListItemStyled = styled.li``;

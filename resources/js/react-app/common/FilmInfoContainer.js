import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from './styledElements';

export default function FilmInfoContainer({ film }) {
    return (
        <FilmInfoContainerStyled>
            {(film.country || film.year) && <ValueStyled>{film.country + ' ' + film.year}</ValueStyled>}
            {film.length && (
                <ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {film.length} Min
                </ValueStyled>
            )}
            {film.medium && (
                <ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {film.medium}
                </ValueStyled>
            )}
            {film.version && (
                <ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    {film.version}
                </ValueStyled>
            )}
        </FilmInfoContainerStyled>
    );
}

const FilmInfoContainerStyled = styled.div`
    margin-bottom: 7px;
    font-size: 0.7em;
`;

const ValueStyled = styled.span``;

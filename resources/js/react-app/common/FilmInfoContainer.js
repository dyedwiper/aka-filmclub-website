import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from './styledElements';

export default function FilmInfoContainer({ film }) {
    return (
        <FilmInfoContainerStyled>
            {(film.country || film.year) && (
                <ValueStyled>
                    {film.country + ' ' + film.year}
                    <VerticalLineStyled> | </VerticalLineStyled>
                </ValueStyled>
            )}
            {film.length && (
                <ValueStyled>
                    {film.length} Min
                    <VerticalLineStyled> | </VerticalLineStyled>
                </ValueStyled>
            )}
            {film.medium && (
                <ValueStyled>
                    {film.medium}
                    <VerticalLineStyled> | </VerticalLineStyled>
                </ValueStyled>
            )}
            {film.version && (
                <ValueStyled>
                    {film.version}
                    <VerticalLineStyled> | </VerticalLineStyled>
                </ValueStyled>
            )}
        </FilmInfoContainerStyled>
    );
}

const FilmInfoContainerStyled = styled.div`
    margin-bottom: 7px;
    font-size: 0.7em;
`;

const ValueStyled = styled.span`
    :last-child span {
        display: none;
    }
`;

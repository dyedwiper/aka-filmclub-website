import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from './styledElements';

export default function CreditsContainer({ film }) {
    return (
        <CreditsContainerStyled>
            {film.directed_by && (
                <>
                    <KeyStyled>Regie: </KeyStyled>
                    <ValueStyled>{film.directed_by}</ValueStyled>
                </>
            )}
            {film.written_by && (
                <>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    <KeyStyled>Drehbuch: </KeyStyled>
                    <ValueStyled>{film.written_by}</ValueStyled>
                </>
            )}
            {film.music_by && (
                <>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    <KeyStyled>Musik: </KeyStyled>
                    <ValueStyled>{film.music_by}</ValueStyled>
                </>
            )}
            {film.shot_by && (
                <>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    <KeyStyled>Kamera: </KeyStyled>
                    <ValueStyled>{film.shot_by}</ValueStyled>
                </>
            )}
            {film.edited_by && (
                <>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    <KeyStyled>Schnitt: </KeyStyled>
                    <ValueStyled>{film.edited_by}</ValueStyled>
                </>
            )}
            {film.cast && (
                <>
                    <VerticalLineStyled> | </VerticalLineStyled>
                    <KeyStyled>Besetzung: </KeyStyled>
                    <ValueStyled>{film.cast}</ValueStyled>
                </>
            )}
        </CreditsContainerStyled>
    );
}

const CreditsContainerStyled = styled.div`
    font-size: 0.7em;
`;

const KeyStyled = styled.span`
    font-weight: bold;
`;

const ValueStyled = styled.span`
    display: inline-block;
`;

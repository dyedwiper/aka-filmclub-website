import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from '../styledElements';

export default function CreditsContainer({ film }) {
    return (
        <CreditsContainerStyled>
            {film.directed_by && (
                <CreditStyled>
                    <KeyStyled>Regie: </KeyStyled>
                    <ValueStyled>{film.directed_by}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.written_by && (
                <CreditStyled>
                    <KeyStyled>Drehbuch: </KeyStyled>
                    <ValueStyled>{film.written_by}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.music_by && (
                <CreditStyled>
                    <KeyStyled>Musik: </KeyStyled>
                    <ValueStyled>{film.music_by}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.shot_by && (
                <CreditStyled>
                    <KeyStyled>Kamera: </KeyStyled>
                    <ValueStyled>{film.shot_by}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.edited_by && (
                <CreditStyled>
                    <KeyStyled>Schnitt: </KeyStyled>
                    <ValueStyled>{film.edited_by}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.cast && (
                <CreditStyled>
                    <KeyStyled>Besetzung: </KeyStyled>
                    <ValueStyled>{film.cast}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
        </CreditsContainerStyled>
    );
}

const CreditsContainerStyled = styled.div`
    font-size: 0.7em;
`;

const CreditStyled = styled.span`
    :last-child span[class*='VerticalLine'] {
        display: none;
    }
`;

const KeyStyled = styled.span`
    font-weight: bold;
`;

const ValueStyled = styled.span``;

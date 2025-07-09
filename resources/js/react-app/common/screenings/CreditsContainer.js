import React from 'react';
import styled from 'styled-components';
import { VerticalLineStyled } from '../styledElements';
import { FSK_RATING_NONE } from '../../constants';

const FSK_RATING_LABELS = {
  1: '0',
  2: '6',
  3: '12',
  4: '16',
  5: '18',
  6: 'ungeprüft',
};


export default function CreditsContainer({ film }) {
    const fskLabel = film.fsk && film.fsk !== FSK_RATING_NONE
    ? FSK_RATING_LABELS[film.fsk]
    : null;

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
            {(film.country || film.year) && (
                <CreditStyled>
                    <KeyStyled>Raumzeit: </KeyStyled>
                    {film.country && <ValueStyled>{film.country} </ValueStyled>}
                    {film.year && <ValueStyled>{film.year}</ValueStyled>}
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.length && (
                <CreditStyled>
                    <KeyStyled>Länge: </KeyStyled>
                    <ValueStyled>{film.length} Min</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.medium && (
                <CreditStyled>
                    <KeyStyled>Medium: </KeyStyled>
                    <ValueStyled>{film.medium}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.version && (
                <CreditStyled>
                    <KeyStyled>Sprachfassung: </KeyStyled>
                    <ValueStyled>{film.version}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {film.original_title && (
                <CreditStyled>
                    <KeyStyled>Originaltitel: </KeyStyled>
                    <ValueStyled>{film.original_title}</ValueStyled>
                    <VerticalLineStyled> | </VerticalLineStyled>
                </CreditStyled>
            )}
            {fskLabel && (
                <CreditStyled>
                    <KeyStyled>FSK: </KeyStyled>
                    <ValueStyled>{fskLabel}</ValueStyled>
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

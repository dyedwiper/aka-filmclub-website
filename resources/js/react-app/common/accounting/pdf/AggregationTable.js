import React from 'react';
import styled from '@react-pdf/styled-components';
import { toEuroWithSymbol } from '../../../utils/moneyFormatters';

export default function AggregationTable({ billing }) {
    return (
        <AggregationTableStyled>
            <RowWithBorderStyled>
                <SignStyled>-</SignStyled>
                <KeyStyled>V-Steuer ({toEuroWithSymbol(billing.ticketTax)} pro Karte)</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.ticketTax * billing.ticketsCount)}</ValueStyled>
            </RowWithBorderStyled>
            <RowStyled>
                <SignStyled></SignStyled>
                <KeyStyled>Nettoerlös</KeyStyled>
                <ValueWithBorderStyled>
                    {toEuroWithSymbol(billing.ticketEarnings - billing.ticketTax * billing.ticketsCount)}
                </ValueWithBorderStyled>
            </RowStyled>
            <CushionStyled />
            <RowStyled>
                <SignStyled></SignStyled>
                <KeyStyled>Filmmiete</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.rent)}</ValueStyled>
            </RowStyled>
            <RowWithBorderStyled>
                <SignStyled>+</SignStyled>
                <KeyStyled>Nebenkosten</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.incidentals)}</ValueStyled>
            </RowWithBorderStyled>
            <RowStyled>
                <SignStyled></SignStyled>
                <KeyStyled>Zwischensumme</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.rent + billing.incidentals)}</ValueStyled>
            </RowStyled>
            <RowWithBorderStyled>
                <SignStyled>+</SignStyled>
                <KeyStyled>MWSt ({billing.valueAddedTaxRate.toLocaleString('de-DE')} %)</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.valueAddedTax)}</ValueStyled>
            </RowWithBorderStyled>
            <RowStyled>
                <SignStyled></SignStyled>
                <KeyStyled>Zu zahlen</KeyStyled>
                <ValueWithBorderStyled>{toEuroWithSymbol(billing.debt)}</ValueWithBorderStyled>
            </RowStyled>
        </AggregationTableStyled>
    );
}

const AggregationTableStyled = styled.View`
    margin: 0 0 0 auto;
`;

const RowStyled = styled.View`
    display: flex;
    flex-direction: row;
`;

const RowWithBorderStyled = styled.View`
    display: flex;
    flex-direction: row;
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    border-bottom-color: #616161;
`;

const SignStyled = styled.Text`
    width: 12pt;
    padding: 1pt 3pt;
`;

const KeyStyled = styled.Text`
    width: 150pt;
    padding: 1pt 3pt;
`;

const ValueStyled = styled.Text`
    width: 70pt;
    padding: 1pt 3pt;
    text-align: right;
`;

const ValueWithBorderStyled = styled.Text`
    width: 70pt;
    padding: 1pt 3pt;
    text-align: right;
    border-bottom-style: solid;
    border-bottom-width: 2pt;
    border-bottom-color: black;
`;

const CushionStyled = styled.View`
    height: 20pt;
`;

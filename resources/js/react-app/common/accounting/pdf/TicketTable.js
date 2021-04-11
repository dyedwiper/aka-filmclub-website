import React from 'react';
import styled from '@react-pdf/styled-components';
import { toEuroWithSymbol } from '../../../utils/moneyUtils';

export default function TicketTable({ billing }) {
    return (
        <TicketTableStyled>
            <HeaderRowStyled>
                <FirstHeaderCellStyled>Ausgegebene Rollenkarten</FirstHeaderCellStyled>
                <HeaderCellStyled>Stückzahl</HeaderCellStyled>
                <HeaderCellStyled>Einzelpreis</HeaderCellStyled>
                <HeaderCellStyled>Gesamtpreis</HeaderCellStyled>
            </HeaderRowStyled>
            {billing.ticket_stacks.map((stack) => (
                <RowStyled key={stack.id}>
                    <CellStyled>{stack.firstNumber}</CellStyled>
                    <CellStyled>{stack.lastNumber}</CellStyled>
                    <CellStyled>{stack.lastNumber - stack.firstNumber + 1}</CellStyled>
                    <CellStyled>{toEuroWithSymbol(stack.price)}</CellStyled>
                    <CellStyled>
                        {toEuroWithSymbol((stack.lastNumber - stack.firstNumber + 1) * stack.price)}
                    </CellStyled>
                </RowStyled>
            ))}
            <FooterRowStyled>
                <FirstFooterCellStyled>Gesamt</FirstFooterCellStyled>
                <CellStyled>{billing.ticketsCount}</CellStyled>
                <CellStyled></CellStyled>
                <CellStyled>{toEuroWithSymbol(billing.ticketEarnings)}</CellStyled>
            </FooterRowStyled>
        </TicketTableStyled>
    );
}

const TicketTableStyled = styled.View`
    display: table;
    margin: 10pt 0;
    border: solid 1pt #616161;
    border-right-width: 0;
    border-bottom-width: 0;
    font-size: 10pt;
`;

const HeaderRowStyled = styled.View`
    flex-direction: row;
    border-bottom-style: solid;
    border-bottom-width: 2pt;
    border-bottom-color: black;
`;

const FirstHeaderCellStyled = styled.Text`
    width: 40%;
    padding: 1pt 3pt;
    border-right-style: solid;
    border-right-width: 1pt;
    border-right-color: #616161;
`;

const HeaderCellStyled = styled.Text`
    width: 20%;
    padding: 1pt 3pt;
    border-right-style: solid;
    border-right-width: 1pt;
    border-right-color: #616161;
`;

const RowStyled = styled.View`
    flex-direction: row;
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    border-bottom-color: #616161;
`;

const CellStyled = styled.Text`
    width: 20%;
    padding: 1pt 3pt;
    border-right-style: solid;
    border-right-width: 1pt;
    border-right-color: #616161;
    text-align: right;
`;

const FooterRowStyled = styled.View`
    flex-direction: row;
    border-top-style: solid;
    border-top-width: 1pt;
    border-top-color: black;
    border-bottom-style: solid;
    border-bottom-width: 1pt;
    border-bottom-color: #616161;
`;

const FirstFooterCellStyled = styled.Text`
    width: 40%;
    padding: 1pt 3pt;
    border-right-style: solid;
    border-right-width: 1pt;
    border-right-color: #616161;
`;

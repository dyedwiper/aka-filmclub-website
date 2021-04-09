import React from 'react';
import styled from 'styled-components';

export default function TicketStackInputsRow({ billing, number }) {
    return (
        <TicketStackInputsRowStyled>
            <LabelStyled htmlFor={'firstTicketInput' + number}>von</LabelStyled>
            <InputStyled
                id={'firstTicketInput' + number}
                type="number"
                min="1"
                name={'firstTicket + number'}
                defaultValue={billing && billing.tickets[number] ? billing.tickets[number].firstNumber : 1}
            />
            <LabelStyled htmlFor={'lastTicketInput' + number}>bis</LabelStyled>
            <InputStyled
                id={'lastTicketInput' + number}
                type="number"
                min="1"
                name={'lastTicket + number'}
                defaultValue={billing && billing.tickets[number] && billing.tickets[number].lastNumber}
            />
            <LabelStyled htmlFor={'priceTicketInput' + number}>à</LabelStyled>
            <InputStyled
                id={'priceTicketInput' + number}
                name={'price' + number}
                defaultValue={billing && billing.tickets[number] ? billing.tickets[number].price : '1,50'}
            />{' '}
            €
        </TicketStackInputsRowStyled>
    );
}

const TicketStackInputsRowStyled = styled.div`
    margin: 10px 0;
`;

const LabelStyled = styled.label`
    margin-right: 10px;
`;

const InputStyled = styled.input`
    width: 80px;
    margin-right: 20px;
    text-align: right;
`;

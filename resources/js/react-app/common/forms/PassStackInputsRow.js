import React from 'react';
import styled from 'styled-components';
import { STANDARD_PASS_PRICE } from '../../constants';

export default function PassStackInputsRow({ billing, number }) {
    return (
        <PassStackInputsRowStyled>
            <LabelStyled htmlFor={'firstPassInput' + number}>von</LabelStyled>
            <InputStyled
                id={'firstPassInput' + number}
                type="number"
                min="1"
                name={'firstPass + number'}
                defaultValue={billing && billing.passes[number] ? billing.passes[number].firstNumber : 1}
            />
            <LabelStyled htmlFor={'lastPassInput' + number}>bis</LabelStyled>
            <InputStyled
                id={'lastPassInput' + number}
                type="number"
                min="1"
                name={'lastPass + number'}
                defaultValue={billing && billing.passes[number] && billing.passes[number].lastNumber}
            />
            <LabelStyled htmlFor={'pricePassInput' + number}>à</LabelStyled>
            <InputStyled
                id={'pricePassInput' + number}
                name={'price' + number}
                defaultValue={billing && billing.passes[number] ? billing.passes[number].price : STANDARD_PASS_PRICE}
            />{' '}
            €
        </PassStackInputsRowStyled>
    );
}

const PassStackInputsRowStyled = styled.div`
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

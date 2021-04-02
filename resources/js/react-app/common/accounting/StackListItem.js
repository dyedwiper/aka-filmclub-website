import React from 'react';
import styled from 'styled-components';
import { toEuro } from '../../utils/moneyUtils';
import { VerticalLineStyled } from '../styledElements';

export default function StackListItem({ stack }) {
    return (
        <StackListItemStyled>
            <StackNumbersStyled>{stack.firstNumber + ' - ' + stack.lastNumber}</StackNumbersStyled>
            <VerticalLineStyled>|</VerticalLineStyled>
            <StackInfoStyled>
                {stack.lastNumber - stack.firstNumber + 1 + ' x ' + toEuro(stack.price) + ' = '}
            </StackInfoStyled>
            <StackBalanceStyled>{toEuro((stack.lastNumber - stack.firstNumber + 1) * stack.price)}</StackBalanceStyled>
        </StackListItemStyled>
    );
}
const StackListItemStyled = styled.div`
    display: grid;
    grid-template-columns: 110px 5px 110px 80px;
`;

const StackNumbersStyled = styled.div``;

const StackInfoStyled = styled.div`
    justify-self: right;
`;

const StackBalanceStyled = styled.div`
    justify-self: right;
`;

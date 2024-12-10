import React from 'react';
import styled from 'styled-components';
import { toEuroWithSymbol } from '../../utils/moneyUtils';
import { VerticalLineStyled } from '../styledElements';

export default function StacksList({ stacks }) {
    return (
        <StacksListStyled>
            {stacks.map((stack) => (
                <StackListItemStyled key={stack.id}>
                    <StackNumbersStyled>{stack.firstNumber + ' - ' + stack.lastNumber}</StackNumbersStyled>
                    <VerticalLineStyled>|</VerticalLineStyled>
                    <StackInfoStyled>
                        {calculateStackAmount(stack) + ' x ' + toEuroWithSymbol(stack.price) + ' = '}
                    </StackInfoStyled>
                    <StackBalanceStyled>
                        {toEuroWithSymbol(calculateStackAmount(stack) * stack.price)}
                    </StackBalanceStyled>
                </StackListItemStyled>
            ))}
            {getValuesPerPrice(stacks).map((value) => (
                <StackListItemStyled key={value.price}>
                    <StackNumbersStyled>Summe</StackNumbersStyled>
                    <VerticalLineStyled>|</VerticalLineStyled>
                    <StackInfoStyled>{value.items + ' x ' + toEuroWithSymbol(value.price) + ' = '}</StackInfoStyled>
                    <StackBalanceStyled>{toEuroWithSymbol(value.earnings)}</StackBalanceStyled>
                </StackListItemStyled>
            ))}
        </StacksListStyled>
    );

    function getValuesPerPrice(stacks) {
        const priceSet = new Set();
        stacks.forEach((stack) => {
            priceSet.add(stack.price);
        });
        const valuesPerPrice = [];
        priceSet.forEach((price) => {
            let itemsForPrice = 0;
            let earningsForPrice = 0;
            stacks
                .filter((stack) => stack.price === price)
                .forEach((stack) => {
                    itemsForPrice += calculateStackAmount(stack);
                    earningsForPrice += calculateStackAmount(stack) * stack.price;
                });
            valuesPerPrice.push({
                price: price,
                items: itemsForPrice,
                earnings: earningsForPrice,
            });
        });
        return valuesPerPrice;
    }

    function calculateStackAmount(stack) {
        return stack.lastNumber - stack.firstNumber + 1;
    }
}

const StacksListStyled = styled.ul`
    margin: 0;
`;

const StackListItemStyled = styled.div`
    display: grid;
    grid-template-columns: 110px 10px 110px 80px;
`;

const StackNumbersStyled = styled.div``;

const StackInfoStyled = styled.div`
    justify-self: right;
`;

const StackBalanceStyled = styled.div`
    justify-self: right;
`;

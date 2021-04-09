import React from 'react';
import styled from 'styled-components';
import { STANDARD_TICKET_PRICE } from '../../constants';
import { toEuro } from '../../utils/moneyUtils';

export default function StackInputsRow({ billing, type, number }) {
    return (
        <StackInputsRowStyled>
            <LabelStyled>
                von
                <InputStyled
                    type="number"
                    min="1"
                    name={'first' + number}
                    defaultValue={
                        billing && billing[type + '_stacks'][number] ? billing[type + '_stacks'][number].firstNumber : 1
                    }
                />
            </LabelStyled>
            <LabelStyled>
                bis
                <InputStyled
                    type="number"
                    min="1"
                    name={'last' + number}
                    defaultValue={
                        billing && billing[type + '_stacks'][number] && billing[type + '_stacks'][number].lastNumber
                    }
                />
            </LabelStyled>
            <LabelStyled>
                à
                <InputStyled
                    name={'price' + number}
                    defaultValue={
                        billing && billing[type + '_stacks'][number]
                            ? toEuro(billing[type + '_stacks'][number].price)
                            : STANDARD_TICKET_PRICE
                    }
                />{' '}
                €
            </LabelStyled>
        </StackInputsRowStyled>
    );
}

const StackInputsRowStyled = styled.div`
    margin: 10px 0;
`;

const LabelStyled = styled.label`
    margin-right: 20px;
`;

const InputStyled = styled.input`
    width: 80px;
    margin-left: 10px;
    text-align: right;
`;

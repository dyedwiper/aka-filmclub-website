import React from 'react';
import styled from 'styled-components';
import DistributorSelect from './DistributorSelect';

export default function BillingFormGroup({ billing }) {
    return (
        <FaqFormGroupStyled>
            <LabelStyled>
                Verleih
                <DistributorSelect />
            </LabelStyled>
            <LabelStyled>
                Mindestgarantie
                <InputStyled inputName="guarantee" defaultValue={billing && billing.guarantee} />
            </LabelStyled>
        </FaqFormGroupStyled>
    );
}

const FaqFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const InputStyled = styled.input``;

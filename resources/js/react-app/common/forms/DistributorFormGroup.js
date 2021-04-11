import React from 'react';
import styled from 'styled-components';

export default function DistributorFormGroup({ distributor }) {
    return (
        <DistributorFormGroupStyled>
            <LabelStyled>
                <LabelTextStyled>Name</LabelTextStyled>
                <InputStyled name="name" defaultValue={distributor && distributor.name} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Adresse</LabelTextStyled>
                <InputStyled name="address" defaultValue={distributor && distributor.address} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Postleitzahl</LabelTextStyled>
                <InputStyled name="zipcode" defaultValue={distributor && distributor.zipcode} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Stadt</LabelTextStyled>
                <InputStyled name="city" defaultValue={distributor && distributor.city} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>E-Mail-Adresse</LabelTextStyled>
                <InputStyled name="email" defaultValue={distributor && distributor.email} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Telefonnummer</LabelTextStyled>
                <InputStyled name="phone" defaultValue={distributor && distributor.phone} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Faxnummer</LabelTextStyled>
                <InputStyled name="fax" defaultValue={distributor && distributor.fax} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Steuernummer</LabelTextStyled>
                <InputStyled name="taxId" defaultValue={distributor && distributor.taxId} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Unsere Kundennummer</LabelTextStyled>
                <InputStyled name="customerId" defaultValue={distributor && distributor.customerId} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Kontoinhaber</LabelTextStyled>
                <InputStyled name="accountOwner" defaultValue={distributor && distributor.accountOwner} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>IBAN</LabelTextStyled>
                <InputStyled name="iban" defaultValue={distributor && distributor.iban} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>BIC</LabelTextStyled>
                <InputStyled name="bic" defaultValue={distributor && distributor.bic} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Name der Bank</LabelTextStyled>
                <InputStyled name="bank" defaultValue={distributor && distributor.bank} />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Kontonummer (altes Format)</LabelTextStyled>
                <InputStyled
                    name="accountNumberOldFormat"
                    defaultValue={distributor && distributor.accountNumberOldFormat}
                />
            </LabelStyled>
            <LabelStyled>
                <LabelTextStyled>Bankleitzahl (altes Format)</LabelTextStyled>
                <InputStyled name="bankIdOldFormat" defaultValue={distributor && distributor.bankIdOldFormat} />
            </LabelStyled>
        </DistributorFormGroupStyled>
    );
}

const DistributorFormGroupStyled = styled.div``;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const LabelTextStyled = styled.div`
    display: inline-block;
    width: 150px;
`;

const InputStyled = styled.input`
    width: 70%;

    @media (max-width: 767px) {
        width: 100%;
    }
`;

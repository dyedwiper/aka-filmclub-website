import React from 'react';
import styled from 'styled-components';
import DistributorSelect from './DistributorSelect';

export default function BillingFormGroup({ billing }) {
    return (
        <FaqFormGroupStyled>
            <DistributorRowStyled>
                <LabelStyled>
                    Verleih
                    <DistributorSelect />
                </LabelStyled>
                <LabelStyled>
                    Terminbestätigungs-Nr.
                    <InputStyled inputName="confirmationNumber" defaultValue={billing && billing.confirmationNumber} />
                </LabelStyled>
            </DistributorRowStyled>
            <FormRowWithFourInputsStyled>
                <LabelStyled>
                    Mindestgarantie
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="guarantee" defaultValue={billing && billing.guarantee} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Prozentsatz
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="percentage" defaultValue={billing && billing.percentage} /> %
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Nebenkosten
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="incidentals" defaultValue={billing ? billing.incidentals : '0,00'} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Mehrwertsteuer
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="valueAddedTax" defaultValue={billing ? billing.valueAddedTax : '7'} />{' '}
                        %
                    </NumberInputContainerStyled>
                </LabelStyled>
            </FormRowWithFourInputsStyled>
            <FormRowWithThreeInputsStyled>
                <LabelStyled>
                    Kasseneinlage
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="cashInlay" defaultValue={billing && billing.cashInlay} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Kassenauslage
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="cashOut" defaultValue={billing && billing.cashOut} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Sonstige Einnahmen/Ausgaben
                    <NumberInputContainerStyled>
                        <NumberInputStyled
                            name="additionalEarnings"
                            defaultValue={billing && billing.additionalEarnings}
                        />{' '}
                        €
                    </NumberInputContainerStyled>
                </LabelStyled>
            </FormRowWithThreeInputsStyled>
            <LabelStyled>
                Kommentar
                <TextareaStyled name="comment" defaultValue={billing && billing.comment} />
            </LabelStyled>
        </FaqFormGroupStyled>
    );
}

const FaqFormGroupStyled = styled.div``;

const DistributorRowStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    grid-gap: 20px;
`;

const FormRowWithFourInputsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const FormRowWithThreeInputsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)) minmax(0, 2fr);
`;

const LabelStyled = styled.label`
    display: block;
    margin: 20px 0;
`;

const InputStyled = styled.input``;

const NumberInputContainerStyled = styled.div``;

const NumberInputStyled = styled.input`
    width: 80%;
    text-align: right;
`;

const TextareaStyled = styled.textarea`
    height: 120px;
`;

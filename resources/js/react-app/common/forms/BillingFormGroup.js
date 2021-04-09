import React, { useState } from 'react';
import styled from 'styled-components';
import DistributorSelect from './DistributorSelect';
import PassStackInputsRow from './PassStackInputsRow';
import TicketStackInputsRow from './TicketStackInputsRow';

export default function BillingFormGroup({ billing }) {
    const [ticketStackNumbers, setTicketStackNumbers] = useState(
        billing && billing.passes.length ? [...Array(billing.tickets.length).keys()] : [0]
    );
    const [passStackNumbers, setPassStackNumbers] = useState(
        billing && billing.passes.length ? [...Array(billing.passes.length).keys()] : [0]
    );

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
                            defaultValue={billing ? billing.additionalEarnings : '0,00'}
                        />{' '}
                        €
                    </NumberInputContainerStyled>
                </LabelStyled>
            </FormRowWithThreeInputsStyled>
            <LabelStyled>
                Freikarten
                <NumberInputContainerStyled>
                    <NumberInputStyled name="freeTickets" defaultValue={billing ? billing.freeTickets : '0'} />
                </NumberInputContainerStyled>
            </LabelStyled>
            <LabelStyled>
                Kommentar
                <TextareaStyled name="comment" defaultValue={billing && billing.comment} />
            </LabelStyled>
            <StackInputsContainerStyled>
                <SubHeadlineStyled>Eintrittskarten</SubHeadlineStyled>
                {ticketStackNumbers.map((stackNumber) => (
                    <TicketStackInputsRow key={stackNumber} billing={billing} number={stackNumber} />
                ))}
                <ButtonStyled type="button" onClick={addTicketStack}>
                    Kartenstapel hinzufügen
                </ButtonStyled>
            </StackInputsContainerStyled>
            <input type="hidden" name="numberOfTicketStacks" value={ticketStackNumbers.length} />
            <StackInputsContainerStyled>
                <SubHeadlineStyled>Ausweise</SubHeadlineStyled>
                {passStackNumbers.map((stackNumber) => (
                    <PassStackInputsRow key={stackNumber} billing={billing} number={stackNumber} />
                ))}
                <ButtonStyled type="button" onClick={addPassStack}>
                    Ausweisstapel hinzufügen
                </ButtonStyled>
            </StackInputsContainerStyled>
            <input type="hidden" name="numberOfPassStacks" value={passStackNumbers.length} />
        </FaqFormGroupStyled>
    );

    function addTicketStack() {
        setTicketStackNumbers([...ticketStackNumbers, ticketStackNumbers.length]);
    }

    function addPassStack() {
        setPassStackNumbers([...passStackNumbers, passStackNumbers.length]);
    }
}

const FaqFormGroupStyled = styled.div``;

const DistributorRowStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    grid-gap: 40px;
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
    margin: 10px 0;
`;

const InputStyled = styled.input``;

const NumberInputContainerStyled = styled.div``;

const NumberInputStyled = styled.input`
    width: 120px;
    text-align: right;
`;

const TextareaStyled = styled.textarea`
    height: 80px;
`;

const StackInputsContainerStyled = styled.section`
    margin: 20px 0;
`;

const SubHeadlineStyled = styled.h3`
    font-size: 1em;
`;

const ButtonStyled = styled.button`
    margin: 10px 0;
`;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_INTERN_DISTRIBUTORS } from '../../constants';
import { toEuro } from '../../utils/moneyUtils';
import DistributorSelect from './DistributorSelect';
import StackInputsRow from './StackInputsRow';

export default function BillingFormGroup({ screening, billing }) {
    const [ticketStackNumbers, setTicketStackNumbers] = useState(
        billing && billing.ticket_stacks.length ? [...Array(billing.ticket_stacks.length).keys()] : [0]
    );
    const [passStackNumbers, setPassStackNumbers] = useState(
        billing && billing.pass_stacks.length ? [...Array(billing.pass_stacks.length).keys()] : [0]
    );

    return (
        <BillingFormGroupStyled>
            {/* When adding a billing, the screening_id is submitted in this hidden input. */}
            {screening && <input type="hidden" name="screening_id" value={screening.id} />}
            <DistributorRowStyled>
                <LabelStyled>
                    Verleih (<Link to={ROUTE_INTERN_DISTRIBUTORS}>Übersicht der Verleihe</Link>)
                    {/* If billing is not null or undefined, it means a billing is edited. This information is needed for the default. */}
                    <DistributorSelect defaultDistributor={billing && billing.distributor} isEditing={billing} />
                </LabelStyled>
                <LabelStyled>
                    Terminbestätigungs-Nr.
                    <InputStyled name="confirmationNumber" defaultValue={billing && billing.confirmationNumber} />
                </LabelStyled>
            </DistributorRowStyled>
            <FormRowWithFourInputsStyled>
                <LabelStyled>
                    Mindestgarantie
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="guarantee" defaultValue={billing && toEuro(billing.guarantee)} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Prozentsatz
                    <NumberInputContainerStyled>
                        <NumberInputStyled
                            name="percentage"
                            defaultValue={billing && billing.percentage.toLocaleString('de-DE')}
                        />{' '}
                        %
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Nebenkosten
                    <NumberInputContainerStyled>
                        <NumberInputStyled
                            name="incidentals"
                            defaultValue={billing ? toEuro(billing.incidentals) : '0,00'}
                        />{' '}
                        €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Mehrwertsteuersatz
                    <NumberInputContainerStyled>
                        <NumberInputStyled
                            name="valueAddedTaxRate"
                            defaultValue={billing ? billing.valueAddedTaxRate : '7'}
                        />{' '}
                        %
                    </NumberInputContainerStyled>
                </LabelStyled>
            </FormRowWithFourInputsStyled>
            <FormRowWithFourInputsStyled>
                <LabelStyled>
                    Kasseneinlage
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="cashInlay" defaultValue={billing && toEuro(billing.cashInlay)} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Kassenauslage
                    <NumberInputContainerStyled>
                        <NumberInputStyled name="cashOut" defaultValue={billing && toEuro(billing.cashOut)} /> €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Sonstige Einnahmen
                    <NumberInputContainerStyled>
                        <NumberInputStyled
                            name="additionalEarnings"
                            defaultValue={billing ? toEuro(billing.additionalEarnings) : '0,00'}
                        />{' '}
                        €
                    </NumberInputContainerStyled>
                </LabelStyled>
                <LabelStyled>
                    Sonstige Ausgaben
                    <NumberInputContainerStyled>
                        <NumberInputStyled
                            name="additionalExpenses"
                            defaultValue={billing ? toEuro(billing.additionalExpenses) : '0,00'}
                        />{' '}
                        €
                    </NumberInputContainerStyled>
                </LabelStyled>
            </FormRowWithFourInputsStyled>
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
                    <StackInputsRow key={stackNumber} billing={billing} type="ticket" number={stackNumber} />
                ))}
                <ButtonStyled type="button" onClick={addTicketStack}>
                    +
                </ButtonStyled>
                <ButtonStyled type="button" onClick={removeTicketStack}>
                    -
                </ButtonStyled>
            </StackInputsContainerStyled>
            <input type="hidden" name="numberOfTicketStacks" value={ticketStackNumbers.length} />
            <StackInputsContainerStyled>
                <SubHeadlineStyled>Ausweise</SubHeadlineStyled>
                {passStackNumbers.map((stackNumber) => (
                    <StackInputsRow key={stackNumber} billing={billing} type="pass" number={stackNumber} />
                ))}
                <ButtonStyled type="button" onClick={addPassStack}>
                    +
                </ButtonStyled>
                <ButtonStyled type="button" onClick={removePassStack}>
                    -
                </ButtonStyled>
            </StackInputsContainerStyled>
            <input type="hidden" name="numberOfPassStacks" value={passStackNumbers.length} />
        </BillingFormGroupStyled>
    );

    function addTicketStack() {
        setTicketStackNumbers([...ticketStackNumbers, ticketStackNumbers.length]);
    }

    function removeTicketStack() {
        setTicketStackNumbers(ticketStackNumbers.slice(0, -1));
    }

    function addPassStack() {
        setPassStackNumbers([...passStackNumbers, passStackNumbers.length]);
    }

    function removePassStack() {
        setPassStackNumbers(passStackNumbers.slice(0, -1));
    }
}

const BillingFormGroupStyled = styled.div``;

const DistributorRowStyled = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
    grid-gap: 40px;
`;

const FormRowWithFourInputsStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
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
    width: 40px;
    margin: 10px 20px 10px 0;
`;

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import StackListItem from '../../common/accounting/StackListItem';
import { HorizontalRuleStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { toEuro } from '../../utils/moneyUtils';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getBillingByUuid } from '../../utils/services/billingServices';
import LoadingPage from '../LoadingPage';

export default function BillingPage() {
    const [billing, setBilling] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { pageTitle, setPageTitle } = useContext(Context);

    useEffect(() => {
        if (billing.screening) {
            document.title = 'Abrechnung: ' + billing.screening.title + ' | aka-Filmclub';
            setPageTitle('Abrechnung: ' + billing.screening.title);
        }
    }, [billing]);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getBillingByUuid(uuid).then((res) => {
            setBilling(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <PageStyled>
            <PageHeadlineStyled>{pageTitle}</PageHeadlineStyled>
            <StackKeyStyled>Eintrittskarten</StackKeyStyled>
            <StacksListStyled>
                {billing.tickets.map((stack) => (
                    <StackListItem key={stack.id} stack={stack} />
                ))}
            </StacksListStyled>
            <StackKeyStyled>Ausweise</StackKeyStyled>
            <StacksListStyled>
                {billing.passes.map((stack) => (
                    <StackListItem key={stack.id} stack={stack} />
                ))}
            </StacksListStyled>
            <EarningsContainerStyled>
                <KeyStyled>Errechnete Einnahmen</KeyStyled>
                <ValueStyled>{toEuro(billing.earnings)}</ValueStyled>
            </EarningsContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Sonstige Einnahmen</KeyStyled>
                <ValueStyled>{toEuro(billing.additionalEarnings)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <KeyStyled>Kasseneinlage</KeyStyled>
                <ValueStyled>{toEuro(billing.cashInlay)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Kassenauslage</KeyStyled>
                <ValueStyled>{toEuro(billing.cashOut)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Tatsächliche Einnahmen</KeyStyled>
                <ValueStyled>{toEuro(billing.cashOut - billing.cashInlay)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Kassendifferenz</KeyStyled>
                <ValueStyled>{toEuro(billing.cashOut - billing.cashInlay - billing.earnings)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <KeyStyled>Mindestgarantie</KeyStyled>
                <ValueStyled>{toEuro(billing.guarantee)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Prozentsatz</KeyStyled>
                <ValueStyled>{billing.percentage + ' %'}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Nebenkosten</KeyStyled>
                <ValueStyled>{toEuro(billing.incidentals)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Filmmiete</KeyStyled>
                <ValueStyled>{toEuro(billing.rent)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>MWSt ({billing.valueAddedTax} %)</KeyStyled>
                <ValueStyled>{toEuro((billing.rent * billing.valueAddedTax) / 100)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Filmmiete + MWSt ({billing.valueAddedTax} %)</KeyStyled>
                <ValueStyled>{toEuro((billing.rent * (billing.valueAddedTax + 100)) / 100)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <KeyStyled>Bilanz</KeyStyled>
                <ValueStyled>
                    {toEuro(
                        billing.ticketEarnings - billing.rent + billing.cashOut - billing.cashInlay - billing.earnings
                    )}
                </ValueStyled>
            </KeyValueContainerStyled>
        </PageStyled>
    );
}

const KeyValueContainerStyled = styled.div``;

const KeyStyled = styled.h3`
    display: inline-block;
    width: 180px;
    font-size: 1em;
    font-weight: bold;
`;

const ValueStyled = styled.div`
    display: inline-block;
    width: 80px;
    text-align: right;
`;

const StackKeyStyled = styled.h3`
    margin-top: 10px;
    font-size: 1em;
    font-weight: bold;
`;

const StacksListStyled = styled.ul`
    margin: 0;
`;

const EarningsContainerStyled = styled.div`
    margin-top: 10px;
`;

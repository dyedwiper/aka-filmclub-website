import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import StackListItem from '../../common/accounting/StackListItem';
import { PageHeadlineStyled, PageStyled } from '../../common/styledElements';
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
                <EarningsKeyStyled>Errechnete Einnahmen aus Eintrittskarten und Ausweisen</EarningsKeyStyled>
                <EarningsValueStyled>{toEuro(billing.earnings)}</EarningsValueStyled>
            </EarningsContainerStyled>
        </PageStyled>
    );
}

const KeyValueContainerStyled = styled.div``;

const KeyStyled = styled.h3`
    display: inline-block;
    width: 150px;
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

const EarningsKeyStyled = styled.h3`
    display: inline-block;
    margin-right: 10px;
    font-size: 1em;
    font-weight: bold;
`;

const EarningsValueStyled = styled.div`
    display: inline-block;
`;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StacksList from '../../common/accounting/StacksList';
import { HorizontalRuleStyled, PageHeadlineStyled, PageStyled } from '../../common/styledElements';
import Context from '../../Context';
import { toEuroWithSymbol } from '../../utils/moneyUtils';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getBillingByUuid } from '../../utils/services/billingServices';
import LoadingPage from '../LoadingPage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BillingPdf from '../../common/accounting/pdf/BillingPdf';

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
            <StacksList stacks={billing.ticket_stacks} />
            <StackKeyStyled>Ausweise</StackKeyStyled>
            <StacksList stacks={billing.pass_stacks} />
            <EarningsContainerStyled>
                <KeyStyled>Errechnete Einnahmen</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.earnings)}</ValueStyled>
            </EarningsContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Sonstige Einnahmen</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.additionalEarnings)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <KeyStyled>Kasseneinlage</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.cashInlay)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Kassenauslage</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.cashOut)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled title="Kassenauslage minus Kasseneinlage">Tatsächliche Einnahmen</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.cashOut - billing.cashInlay)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled title="Tatsächliche Einnahmen minus errechnete Einnahmen">Kassendifferenz</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.cashOut - billing.cashInlay - billing.earnings)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <DistributorKeyStyled>Verleih</DistributorKeyStyled>
                <DistributorValueStyled>{billing.distributor && billing.distributor.name}</DistributorValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Mindestgarantie</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.guarantee)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Prozentsatz</KeyStyled>
                <ValueStyled>{billing.percentage.toLocaleString('de-DE') + ' %'}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Nebenkosten</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.incidentals)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <KeyStyled>Filmmiete inkl. Nebenkosten</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.rent)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>MWSt ({billing.valueAddedTax} %)</KeyStyled>
                <ValueStyled>{toEuroWithSymbol((billing.rent * billing.valueAddedTax) / 100)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled title="Filmmiete plus Nebenkosten plus Mehrwertsteuer">Zu zahlen</KeyStyled>
                <ValueStyled>{toEuroWithSymbol((billing.rent * (billing.valueAddedTax + 100)) / 100)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled title="Einnahmen aus Ticketverkauf minus Filmmiete und Nebenkosten (ohne Mehrwertsteuer wegen Erstattung)">
                    Bilanz
                </KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.ticketEarnings - billing.rent)}</ValueStyled>
            </KeyValueContainerStyled>
            {billing.comment && (
                <>
                    <HorizontalRuleStyled />
                    <CommentKeyStyled>Kommentar</CommentKeyStyled>
                    <CommentValueStyled>{billing.comment}</CommentValueStyled>
                </>
            )}
            <EditLinkStyled to={'/intern/editBilling/' + billing.uuid}>Abrechnung bearbeiten</EditLinkStyled>
            <PDFDownloadLink document={<BillingPdf billing={billing} />} fileName={'Abrechnung'}>
                PDF runterladen
            </PDFDownloadLink>
            <Link to={'/intern/tempPdf/' + billing.uuid}>temp pdf</Link>
        </PageStyled>
    );
}

const KeyValueContainerStyled = styled.div``;

const KeyStyled = styled.h3`
    display: inline-block;
    width: 230px;
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

const EarningsContainerStyled = styled.div`
    margin-top: 10px;
`;

const DistributorKeyStyled = styled.h3`
    display: inline-block;
    margin-right: 5px;
    font-size: 1em;
    font-weight: bold;
`;

const DistributorValueStyled = styled.span``;

const CommentKeyStyled = styled.h3`
    font-size: 1em;
    font-weight: bold;
`;

const CommentValueStyled = styled.p``;

const EditLinkStyled = styled(Link)`
    display: block;
    margin-top: 20px;
`;

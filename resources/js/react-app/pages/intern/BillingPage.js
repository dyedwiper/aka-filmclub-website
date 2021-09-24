import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BillingPdf from '../../common/accounting/pdf/BillingPdf';
import StacksList from '../../common/accounting/StacksList';
import BasePage from '../../common/BasePage';
import UpdateInfo from '../../common/misc/UpdateInfo';
import { HorizontalRuleStyled, PageHeadlineStyled, VerticalLineStyled } from '../../common/styledElements';
import { PAGE_TITLE_BILLING, ROUTE_INTERN_EDIT_BILLING } from '../../constants';
import Context from '../../Context';
import { toEuroWithSymbol } from '../../utils/moneyFormatters';
import { getLastParameterFromPath } from '../../utils/pathUtils';
import { getBillingByUuid } from '../../utils/services/billingServices';
import { replaceUmlautsAndSpecialCharacters } from '../../utils/stringUtils';
import LoadingPage from '../LoadingPage';

export default function BillingPage() {
    const [billing, setBilling] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { isUserEditor, pageTitle } = useContext(Context);

    useEffect(() => {
        const uuid = getLastParameterFromPath();
        getBillingByUuid(uuid).then((res) => {
            setBilling(res.data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <LoadingPage />;

    return (
        <BasePage pageTitle={PAGE_TITLE_BILLING + ': ' + billing.screening.title}>
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
                <KeyStyled>Filmmiete</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.rent)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>Filmmiete inkl. Nebenkosten</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.rent + billing.incidentals)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled>MWSt ({billing.valueAddedTaxRate} %)</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.valueAddedTax)}</ValueStyled>
            </KeyValueContainerStyled>
            <KeyValueContainerStyled>
                <KeyStyled title="Filmmiete plus Nebenkosten plus Mehrwertsteuer">Zu zahlen</KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.debt)}</ValueStyled>
            </KeyValueContainerStyled>
            <HorizontalRuleStyled />
            <KeyValueContainerStyled>
                <KeyStyled title="Einnahmen aus Ticketverkauf minus Filmmiete und Nebenkosten (ohne Mehrwertsteuer wegen Erstattung)">
                    Bilanz
                </KeyStyled>
                <ValueStyled>{toEuroWithSymbol(billing.balance)}</ValueStyled>
            </KeyValueContainerStyled>
            {billing.comment && (
                <>
                    <HorizontalRuleStyled />
                    <CommentKeyStyled>Kommentar</CommentKeyStyled>
                    <CommentValueStyled>{billing.comment}</CommentValueStyled>
                </>
            )}
            <LinksContainerStyled>
                {isUserEditor && (
                    <>
                        <EditLinkStyled to={ROUTE_INTERN_EDIT_BILLING + billing.uuid}>
                            Abrechnung bearbeiten
                        </EditLinkStyled>
                        <VerticalLineStyled>|</VerticalLineStyled>
                    </>
                )}
                <PDFDownloadLink
                    document={<BillingPdf billing={billing} />}
                    fileName={
                        'aka-Filmclub_Abrechnung_' +
                        replaceUmlautsAndSpecialCharacters(billing.screening.title) +
                        '_' +
                        billing.screening.date
                    }
                >
                    PDF runterladen
                </PDFDownloadLink>
            </LinksContainerStyled>
            <UpdateInfo entity={billing} />
        </BasePage>
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

const LinksContainerStyled = styled.div`
    margin-top: 20px;
`;

const EditLinkStyled = styled(Link)`
    display: inline-block;
`;

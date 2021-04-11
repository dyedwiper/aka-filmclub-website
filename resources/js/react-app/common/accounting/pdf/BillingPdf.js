import { Document, Page } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import React from 'react';
import akaLogo from '../../../assets/aka_logo.png';
import {
    AKA_ADDRESS,
    AKA_EMAIL,
    AKA_PHONE,
    AKA_FAX,
    AKA_IBAN,
    AKA_BIC,
    AKA_BANK,
    AKA_SHORTNAME,
    AKA_ZIPCODE,
    AKA_CITY,
} from '../../../constants';
import { formatToDateString } from '../../../utils/dateFormatters';
import { toEuroWithSymbol } from '../../../utils/moneyUtils';
import AggregationTable from './AggregationTable';
import TicketsTable from './TicketsTable';

export default function BillingPdf({ billing }) {
    return (
        <Document>
            <Page size="A4">
                <PageContainerStyled>
                    <LogoStyled src={akaLogo} />
                    <HeaderStyled>
                        <AddressContainerStyled>
                            <AddressFieldStyled>{billing.distributor && billing.distributor.name}</AddressFieldStyled>
                            <AddressFieldStyled>
                                {billing.distributor && billing.distributor.address}
                            </AddressFieldStyled>
                            <AddressFieldStyled>
                                {billing.distributor && billing.distributor.zipcode + ' ' + billing.distributor.city}
                            </AddressFieldStyled>
                        </AddressContainerStyled>
                        <DistributorEmailPhoneFaxStyled>
                            {billing.distributor &&
                                'E-Mail: ' +
                                    billing.distributor.email +
                                    ' / Tel: ' +
                                    billing.distributor.phone +
                                    ' / Fax: ' +
                                    billing.distributor.fax}
                        </DistributorEmailPhoneFaxStyled>
                    </HeaderStyled>
                    <MainStyled>
                        <HeadlineStyled>Abrechnung: {billing.screening.title}</HeadlineStyled>
                        <DateStyled>Spieltermin: {formatToDateString(billing.screening.date)}</DateStyled>
                        <BillingInfoStyled>
                            <InfoFieldStyled>TB-Nr.: {billing.confirmationNumber}</InfoFieldStyled>
                            <InfoFieldStyled>Unsere Kundennr.: {billing.distributor.customerId}</InfoFieldStyled>
                            <InfoFieldStyled>
                                Prozentsatz: {billing.percentage.toLocaleString('de-DE') + ' %'}
                            </InfoFieldStyled>
                            <InfoFieldStyled>Mindestgarantie: {toEuroWithSymbol(billing.guarantee)}</InfoFieldStyled>
                        </BillingInfoStyled>
                        <TicketsTable billing={billing} />
                        <AggregationTable billing={billing} />
                        <TransferralContainerStyled>
                            <TransferralInfoStyled>
                                Den Betrag überweisen wir in den nächsten Tagen auf folgendes Konto:
                            </TransferralInfoStyled>
                            <AccountInfoStyled>
                                IBAN {billing.distributor.iban}{' '}
                                {billing.distributor.bic && ', BIC ' + billing.distributor.bic}
                            </AccountInfoStyled>
                        </TransferralContainerStyled>
                    </MainStyled>
                    <FooterStyled>
                        <AkaAdressStyled>
                            {AKA_SHORTNAME}, {AKA_ADDRESS}, {AKA_ZIPCODE} {AKA_CITY} | E-Mail: {AKA_EMAIL} | Tel:{' '}
                            {AKA_PHONE} | Fax: {AKA_FAX} | IBAN: {AKA_IBAN}, BIC: {AKA_BIC}, {AKA_BANK}
                        </AkaAdressStyled>
                    </FooterStyled>
                </PageContainerStyled>
            </Page>
        </Document>
    );
}

const PageContainerStyled = styled.View`
    position: relative;
    height: 100vh;
    padding: 40pt 60pt;
    font-size: 12pt;
`;

const LogoStyled = styled.Image`
    position: fixed;
    top: 0;
    left: 330pt;
    height: 90pt;
    width: 120pt;
`;

const HeaderStyled = styled.View`
    display: flex;
    flex-direction: column;
`;

const AddressContainerStyled = styled.View`
    margin-bottom: 10pt;
`;

const AddressFieldStyled = styled.Text``;

const DistributorEmailPhoneFaxStyled = styled.Text``;

const MainStyled = styled.View`
    margin: 40pt 0 0 0;
`;

const HeadlineStyled = styled.Text`
    margin-bottom: 10pt;
    font-size: 24pt;
`;

const DateStyled = styled.Text`
    margin-bottom: 10pt;
`;

const BillingInfoStyled = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const InfoFieldStyled = styled.Text`
    width: 50%;
    margin-bottom: 10pt;
`;

const TransferralContainerStyled = styled.View`
    margin: 30pt 0;
`;

const TransferralInfoStyled = styled.Text``;

const AccountInfoStyled = styled.Text``;

TransferralInfoStyled;

const FooterStyled = styled.View`
    position: absolute;
    bottom: 0;
    width: 100vw;
    padding: 40pt 60pt;
`;

const AkaAdressStyled = styled.Text`
    font-size: 9pt;
`;

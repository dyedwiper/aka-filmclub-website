import { Document, Page } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import React from 'react';
import akaLogo from '../../../assets/aka_logo.png';
import { formatToDateString } from '../../../utils/dateFormatters';
import { toEuroWithSymbol } from '../../../utils/moneyUtils';
import TicketTable from './TicketTable';

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
                        <TicketTable billing={billing} />
                        <ResultRowStyled></ResultRowStyled>
                    </MainStyled>
                    <FooterStyled>
                        <AkaAdressStyled>aka-Filmclub e.V. - Rheinstr. 12 - 79104 Freiburg</AkaAdressStyled>
                    </FooterStyled>
                </PageContainerStyled>
            </Page>
        </Document>
    );
}

const PageContainerStyled = styled.View`
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

const ResultRowStyled = styled.View``;

const FooterStyled = styled.View`
    position: fixed;
    top: 700pt;
`;

const AkaAdressStyled = styled.Text`
    width: 300pt;
`;

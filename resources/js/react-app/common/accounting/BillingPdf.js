import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import akaLogo from '../../assets/aka_logo.png';
import { formatToDateString } from '../../utils/dateFormatters';

export default function BillingPdf({ billing }) {
    return (
        <Document>
            <Page size="A4">
                <PageContainerStyled>
                    <LogoStyled src={akaLogo} />
                    <HeaderStyled>
                        <AddressContainerStyled>
                            <DistributorNameStyled>
                                {billing.distributor && billing.distributor.name}
                            </DistributorNameStyled>
                            <DistributorAddressStyled>
                                {billing.distributor && billing.distributor.address}
                            </DistributorAddressStyled>
                            <DistributorCityStyled>
                                {billing.distributor && billing.distributor.zipcode + ' ' + billing.distributor.city}
                            </DistributorCityStyled>
                        </AddressContainerStyled>
                        <DistributorEmailStyled>
                            {billing.distributor && billing.distributor.email}
                        </DistributorEmailStyled>
                        <DistributorPhoneFaxStyled>
                            {billing.distributor &&
                                'Tel: ' + billing.distributor.phone + ' / Fax: ' + billing.distributor.fax}
                        </DistributorPhoneFaxStyled>
                    </HeaderStyled>
                    <MainStyled>
                        <HeadlineStyled>Abrechnung: {billing.screening.title}</HeadlineStyled>
                        <ConfirmationNumberStyled>TB-Nr.: {billing.confirmationNumber}</ConfirmationNumberStyled>
                        <DateStyled>Spieltermin: {formatToDateString(billing.screening.date)}</DateStyled>
                        <CustomerIdStyled>Unsere Kundennr.: {billing.distributor.customerId}</CustomerIdStyled>
                        <PercentageStyled>Prozentsatz: {billing.percentage}</PercentageStyled>
                        <GuaranteeStyled>Mindestgarantie: {billing.guarantee}</GuaranteeStyled>
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
    padding: 40pt;
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

const DistributorNameStyled = styled.Text``;

const DistributorAddressStyled = styled.Text``;

const DistributorCityStyled = styled.Text``;

const DistributorEmailStyled = styled.Text``;

const DistributorPhoneFaxStyled = styled.Text``;

const MainStyled = styled.View``;

const HeadlineStyled = styled.Text``;

const ConfirmationNumberStyled = styled.Text``;

const DateStyled = styled.Text``;

const CustomerIdStyled = styled.Text``;

const PercentageStyled = styled.Text``;

const GuaranteeStyled = styled.Text``;

const FooterStyled = styled.View`
    position: fixed;
    top: 700pt;
`;

const AkaAdressStyled = styled.Text`
    width: 300pt;
    font-size: 12pt;
`;

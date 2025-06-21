import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import akaLogo from '../../../assets/aka_logo.png';
import {
    AKA_ADDRESS,
    AKA_BANK,
    AKA_BIC,
    AKA_CITY,
    AKA_EMAIL,
    AKA_FAX,
    AKA_IBAN,
    AKA_PHONE,
    AKA_SHORTNAME,
    AKA_ZIPCODE,
} from '../../../constants';
import { formatToDateString } from '../../../utils/dateFormatters';
import { toEuroWithSymbol } from '../../../utils/moneyUtils';
import { toGermanString } from '../../../utils/numberUtils';
import AddressHeader from './AddressHeader';
import AggregationTable from './AggregationTable';
import TicketsTable from './TicketsTable';

export default function BillingPdf({ billing }) {
    return (
        <Document>
            <Page size="A4">
                <View style={styles.pageContainer}>
                    <Image src={akaLogo} style={styles.logo} />
                    {billing.distributor && <AddressHeader distributor={billing.distributor} />}
                    <View style={styles.main}>
                        <Text style={styles.headline}>Abrechnung: {billing.screening.title}</Text>
                        <Text style={styles.date}>Spieltermin: {formatToDateString(billing.screening.date)}</Text>
                        <View style={styles.billingInfo}>
                            <Text style={styles.infoField}>TB-Nr.: {billing.confirmationNumber}</Text>
                            <Text style={styles.infoField}>
                                Prozentsatz: {toGermanString(billing.percentage) + ' %'}
                            </Text>
                            <Text style={styles.infoField}>Unsere Kundennr.: {billing.distributor?.customerId}</Text>
                            <Text style={styles.infoField}>Mindestgarantie: {toEuroWithSymbol(billing.guarantee)}</Text>
                        </View>
                        <TicketsTable billing={billing} />
                        <AggregationTable billing={billing} />
                        {billing.distributor?.iban && (
                            <View style={styles.transferralContainer}>
                                <Text>Den Betrag überweisen wir in den nächsten Tagen auf folgendes Konto:</Text>
                                <Text>
                                    IBAN {billing.distributor.iban}
                                    {billing.distributor.bic && ', BIC ' + billing.distributor.bic}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.akaAddress}>
                            {AKA_SHORTNAME}, {AKA_ADDRESS}, {AKA_ZIPCODE} {AKA_CITY} | E-Mail: {AKA_EMAIL} | Tel:{' '}
                            {AKA_PHONE} | Fax: {AKA_FAX} | IBAN: {AKA_IBAN}, BIC: {AKA_BIC}, {AKA_BANK}
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

const styles = StyleSheet.create({
    pageContainer: { position: 'relative', height: '100vh', padding: '40pt 60pt', fontSize: '12pt' },
    logo: { position: 'fixed', top: 0, left: '330pt', height: '90pt', width: '120pt' },
    main: { margin: '40pt 0 0 0' },
    headline: { marginBottom: '10pt', fontSize: '24pt' },
    date: { marginBottom: '10pt' },
    billingInfo: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' },
    infoField: { width: '50%', marginBottom: '10pt' },
    transferralContainer: { margin: '30pt 0' },
    footer: { position: 'absolute', bottom: 0, width: '100vw', padding: '40pt 60pt' },
    akaAddress: { fontSize: '9pt' },
});

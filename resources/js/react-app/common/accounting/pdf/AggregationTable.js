import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { toEuroWithSymbol } from '../../../utils/moneyUtils';
import { toGermanString } from '../../../utils/numberUtils';

export default function AggregationTable({ billing }) {
    return (
        <View style={styles.aggregationTable}>
            <View style={styles.rowWithBorder}>
                <Text style={styles.sign}>-</Text>
                <Text style={styles.key}>MwSt ({toGermanString(billing.valueAddedTaxRateOnEarnings)} %)</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.valueAddedTaxOnEarnings)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Nettoerlös</Text>
                <Text style={styles.valueWithBorder}>{toEuroWithSymbol(billing.netTicketEarnings)}</Text>
            </View>
            <View style={styles.cushion} />
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Filmmiete</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.rent)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.sign}>+</Text>
                <Text style={styles.key}>Nebenkosten</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.incidentals)}</Text>
            </View>
            <View style={styles.rowWithBorder}>
                <Text style={styles.sign}>+</Text>
                <Text style={styles.key}>SPIO</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.spio)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Zwischensumme</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.rent + billing.incidentals + billing.spio)}</Text>
            </View>
            <View style={styles.rowWithBorder}>
                <Text style={styles.sign}>+</Text>
                <Text style={styles.key}>MwSt ({toGermanString(billing.valueAddedTaxRateOnDebt)} %)</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.valueAddedTaxOnDebt)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Zu zahlen</Text>
                <Text style={styles.valueWithBorder}>{toEuroWithSymbol(billing.debt)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    aggregationTable: { margin: '0 0 0 auto' },
    rowWithBorder: {
        display: 'flex',
        flexDirection: 'row',
        borderBottom: '1pt solid #616161',
    },
    row: { display: 'flex', flexDirection: 'row' },
    sign: { width: '12pt', padding: '1pt 3pt' },
    key: { width: '150pt', padding: '1pt 3pt' },
    value: { width: '70pt', padding: '1pt 3pt', textAlign: 'right' },
    valueWithBorder: {
        width: '70pt',
        padding: '1pt 3pt',
        textAlign: 'right',
        borderBottom: '2pt solid black',
    },
    cushion: { height: '20pt' },
});

import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { toEuroWithSymbol } from '../../../utils/moneyFormatters';

export default function AggregationTable({ billing }) {
    return (
        <View style={styles.aggregationTable}>
            <View style={styles.rowWithBorder}>
                <Text style={styles.sign}>-</Text>
                <Text style={styles.key}>V-Steuer ({toEuroWithSymbol(billing.ticketTax)} pro Karte)</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.ticketTax * billing.ticketsCount)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Nettoerlös</Text>
                <Text style={styles.valueWithBorder}>
                    {toEuroWithSymbol(billing.ticketEarnings - billing.ticketTax * billing.ticketsCount)}
                </Text>
            </View>
            <View style={styles.cushion} />
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Filmmiete</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.rent)}</Text>
            </View>
            <View style={styles.rowWithBorder}>
                <Text style={styles.sign}>+</Text>
                <Text style={styles.key}>Nebenkosten</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.incidentals)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.sign}></Text>
                <Text style={styles.key}>Zwischensumme</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.rent + billing.incidentals)}</Text>
            </View>
            <View style={styles.rowWithBorder}>
                <Text style={styles.sign}>+</Text>
                <Text style={styles.key}>MWSt ({billing.valueAddedTaxRate.toLocaleString('de-DE')} %)</Text>
                <Text style={styles.value}>{toEuroWithSymbol(billing.valueAddedTax)}</Text>
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
        borderBottomStyle: 'solid',
        borderBottomWidth: '1pt',
        borderBottomColor: '#616161',
    },
    row: { display: 'flex', flexDirection: 'row' },
    sign: { width: '12pt', padding: '1pt 3pt' },
    key: { width: '150pt', padding: '1pt 3pt' },
    value: { width: '70pt', padding: '1pt 3 pt', textAlign: 'right' },
    valueWithBorder: {
        width: '70pt',
        padding: '1pt 3pt',
        textAlign: 'right',
        borderBottomStyle: 'solid',
        borderBottomWidth: '2pt',
        borderBottomColor: 'black',
    },
    cushion: { height: '20pt' },
});

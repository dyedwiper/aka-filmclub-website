import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { toEuroWithSymbol } from '../../../utils/moneyUtils';

export default function TicketsTable({ billing }) {
    return (
        <View style={styles.ticketsTable}>
            <View style={styles.headerRow}>
                <Text style={styles.firstHeaderCell}>Ausgegebene Rollenkarten</Text>
                <Text style={styles.headerCell}>Stückzahl</Text>
                <Text style={styles.headerCell}>Einzelpreis</Text>
                <Text style={styles.headerCell}>Gesamtpreis</Text>
            </View>
            {billing.ticket_stacks.map((stack) => (
                <View key={stack.id} style={styles.row}>
                    <Text style={styles.cell}>{stack.firstNumber}</Text>
                    <Text style={styles.cell}>{stack.lastNumber}</Text>
                    <Text style={styles.cell}>{stack.lastNumber - stack.firstNumber + 1}</Text>
                    <Text style={styles.cell}>{toEuroWithSymbol(stack.price)}</Text>
                    <Text style={styles.cell}>
                        {toEuroWithSymbol((stack.lastNumber - stack.firstNumber + 1) * stack.price)}
                    </Text>
                </View>
            ))}
            <View style={styles.footerRow}>
                <Text style={styles.firstFooterCell}>Gesamt</Text>
                <Text style={styles.cell}>{billing.ticketsCount}</Text>
                <Text style={styles.cell}></Text>
                <Text style={styles.cell}>{toEuroWithSymbol(billing.ticketEarnings)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ticketsTable: {
        display: 'table',
        margin: '10pt 0',
        border: '1pt solid #616161',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    headerRow: {
        flexDirection: 'row',
        borderBottom: '2pt solid black',
    },
    firstHeaderCell: {
        width: '40%',
        padding: '1pt 3pt',
        borderRight: '1pt solid #616161',
    },
    headerCell: {
        width: '20%',
        padding: '1pt 3pt',
        borderRight: '1pt solid #616161',
    },
    row: { flexDirection: 'row', borderBottom: '1pt solid #616161' },
    cell: {
        width: '20%',
        padding: '1pt 3pt',
        borderRight: '1pt solid #616161',
        textAlign: 'right',
    },
    footerRow: {
        flexDirection: 'row',
        borderTop: '1pt solid black',
        borderBottom: '1pt solid #616161',
    },
    firstFooterCell: {
        width: '40%',
        padding: '1pt 3pt',
        borderRight: '1pt solid #616161',
    },
});

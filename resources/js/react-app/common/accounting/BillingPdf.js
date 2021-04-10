import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function BillingPdf({ billing }) {
    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Hello World</Text>
                </View>
            </Page>
        </Document>
    );
}

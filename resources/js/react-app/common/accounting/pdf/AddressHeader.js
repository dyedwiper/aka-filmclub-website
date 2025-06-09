import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

export default function AddressHeader({ distributor }) {
    return (
        <View style={styles.header}>
            <View style={styles.addressContainer}>
                <Text>{distributor.name}</Text>
                <Text>{distributor.address}</Text>
                <Text>{distributor.zipcode + ' ' + distributor.city}</Text>
            </View>
            <Text>
                {'E-Mail: ' + distributor.email + ' / Tel: ' + distributor.phone + ' / Fax: ' + distributor.fax}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { display: 'flex', flexDirection: 'column' },
    addressContainer: { marginBottom: '10pt' },
});

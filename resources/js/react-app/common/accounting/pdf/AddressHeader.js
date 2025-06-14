import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

export default function AddressHeader({ distributor }) {
    return (
        <View style={styles.header}>
            <View style={styles.addressContainer}>
                <Text>{distributor.name}</Text>
                {!!distributor.address && <Text>{distributor.address}</Text>}
                <Text>
                    {!!distributor.zipcode && <Text>{distributor.zipcode} </Text>}
                    {!!distributor.city && <Text>{distributor.city}</Text>}
                </Text>
            </View>
            <Text>
                {!!distributor.email && (
                    <Text>
                        <Text>{'E-Mail: ' + distributor.email}</Text>
                        <Text> / </Text>
                    </Text>
                )}
                {!!distributor.phone && (
                    <Text>
                        <Text>{'Tel: ' + distributor.phone}</Text>
                        <Text> / </Text>
                    </Text>
                )}
                {!!distributor.fax && <Text>{'Fax: ' + distributor.fax}</Text>}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { display: 'flex', flexDirection: 'column' },
    addressContainer: { marginBottom: '10pt' },
});

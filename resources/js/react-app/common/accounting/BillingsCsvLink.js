import React from 'react';
import { CSVLink } from 'react-csv';
import { toEuro } from '../../utils/moneyUtils';

export default function BillingsCsvLink({ screenings, semester }) {
    return (
        <CSVLink
            headers={prepareHeaders()}
            data={prepareData(screenings)}
            filename={'Abrechnungsstatistik_' + semester.value}
        >
            Statistik als CSV-Datei herunterladen
        </CSVLink>
    );

    function prepareHeaders() {
        const headers = [
            { label: 'Semester', key: 'semester' },
            { label: 'Datum', key: 'date' },
            { label: 'Titel', key: 'title' },
            { label: 'Verkaufte Eintrittskarten', key: 'tickets' },
            { label: 'Verkaufte Ausweise', key: 'passes' },
            { label: 'Mindestgarantie', key: 'guarantee' },
            { label: 'Prozentsatz', key: 'percentage' },
            { label: 'Nebenkosten', key: 'incidentals' },
            { label: 'SPIO', key: 'spio' },
            { label: 'Sonstige Einnahmen', key: 'additionalEarnings' },
            { label: 'Sonstige Ausgaben', key: 'additionalExpenses' },
            { label: 'Bilanz', key: 'balance' },
        ];
        return headers;
    }

    function prepareData(screenings) {
        const data = screenings.filter((screening) => screening.billing).map((screening) => mapToDataEntry(screening));
        return data;
    }

    function mapToDataEntry(screening) {
        const entry = {
            semester: semester.value,
            date: screening.date,
            title: screening.title,
            tickets: screening.billing.ticketsCount,
            passes: screening.billing.passesCount,
            guarantee: toEuro(screening.billing.guarantee),
            percentage: screening.billing.percentage.toString().replace('.', ','),
            incidentals: toEuro(screening.billing.incidentals),
            spio: toEuro(screening.billing.spio),
            additionalEarnings: toEuro(screening.billing.additionalEarnings),
            additionalExpenses: toEuro(screening.billing.additionalExpenses),
            balance: toEuro(screening.billing.balance),
        };
        return entry;
    }
}

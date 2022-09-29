import React from 'react';
import { CSVLink } from 'react-csv';
import { toEuro } from '../../utils/moneyFormatters';

export default function BillingsCsvLink({ screenings, semester }) {
    console.log(semester);

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
            { label: 'Sonstige Einnahmen', key: 'additionalEarnings' },
            { label: 'Sonstige Ausgaben', key: 'additionalExpenses' },
            { label: 'Bilanz', key: 'balance' },
        ];
        return headers;
    }

    function prepareData(screenings) {
        const data = screenings.map((screening) => mapToDataEntry(screening));
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
            percentage: screening.billing.percentage,
            incidentals: toEuro(screening.billing.incidentals),
            additionalEarnings: toEuro(screening.billing.additionalEarnings),
            additionalExpenses: toEuro(screening.billing.additionalExpenses),
            balance: toEuro(screening.billing.balance),
        };
        return entry;
    }
}

import React from 'react';
import { formatToIcsString } from '../utils/dateFormatters';

export default function CalendarDownloadLink({ screening }) {
    const icsString = `
        BEGIN:VCALENDAR
        VERSION:2.0
        PRODID:-//aka-Filmclub e.V.//aka-Filmclub e.V. iCalendar 2.0//EN
        CALSCALE:GREGORIAN
        METHOD:PUBLISH
        X-WR-CALNAME:aka-Filmclub
        X-WR-TIMEZONE:Europe/Berlin
        BEGIN:VEVENT
        SUMMARY:aka-Filmclub: ${screening.title}
        LOCATION:${screening.venue}
        DESCRIPTION:https://aka-filmclub.de/screenings/${screening.uuid}
        DTSTART:${formatToIcsString(screening.date)}
        DTEND:${formatToIcsString(screening.date, screening.length)}
        END:VEVENT
        END:VCALENDAR
    `;

    console.log(formatToIcsString(screening.date));

    console.log(icsString);

    return <div></div>;
}

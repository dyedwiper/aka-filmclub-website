import React, { useContext } from 'react';
import styled from 'styled-components';
import calendarIcon from '../../assets/calendar_icon.png';
import Context from '../../Context';
import { formatToIcsString } from '../../utils/dateFormatters';

export default function CalendarSeriesDownloadLink({ screenings }) {
    const { currentSemester } = useContext(Context);

    // The template string must be unindented like this.
    const icsString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//aka-Filmclub e.V.//aka-Filmclub e.V. iCalendar 2.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:aka-Filmclub
X-WR-TIMEZONE:Europe/Berlin
${screenings
    .map(
        (screening) => `BEGIN:VEVENT
SUMMARY:aka-Filmclub: ${screening.title}
LOCATION:${screening.venue}
DESCRIPTION:https://aka-filmclub.de/screenings/${screening.uuid}
DTSTART:${formatToIcsString(screening.date)}
DTEND:${formatToIcsString(screening.date, screening.length)}
END:VEVENT`
    )
    .join('\n')}
END:VCALENDAR`;

    return (
        <CalendarSeriesDownloadLinkStyled
            href={'data:text/calendar,' + icsString}
            download={'aka-Filmclub_' + currentSemester.name}
        >
            <IconStyled src={calendarIcon} />
            aKalender-Serie runterladen
        </CalendarSeriesDownloadLinkStyled>
    );
}

const CalendarSeriesDownloadLinkStyled = styled.a`
    display: block;
    margin-bottom: 10px;
`;

const IconStyled = styled.img`
    height: 16px;
    margin-right: 10px;
`;

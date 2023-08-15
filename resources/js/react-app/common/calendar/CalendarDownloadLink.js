import React from 'react';
import styled from 'styled-components';
import { formatToIcsString } from '../../utils/dateFormatters';
import calendarIcon from '../../assets/calendar_icon.png';
import { AKA_WEBSITE_URL, ROUTE_SCREENING } from '../../constants';
import { joinPath } from '../../utils/pathUtils';

export default function CalendarDownloadLink({ screening }) {
    // The template string must be unindented like this.
    const icsString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//aka-Filmclub e.V.//aka-Filmclub e.V. iCalendar 2.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:aka-Filmclub
X-WR-TIMEZONE:Europe/Berlin
BEGIN:VEVENT
SUMMARY:aka-Filmclub: ${screening.title}
LOCATION:${screening.venue}
DESCRIPTION:${joinPath(AKA_WEBSITE_URL, ROUTE_SCREENING, screening.uuid)}
DTSTART:${formatToIcsString(screening.date)}
DTEND:${formatToIcsString(screening.date, screening.length)}
END:VEVENT
END:VCALENDAR`;

    return (
        <CalendarDownloadLinkStyled
            href={'data:text/calendar,' + encodeURIComponent(icsString)}
            download={'aka-Filmclub_' + screening.title}
        >
            <IconStyled src={calendarIcon} />
            aKalender-Eintrag runterladen
        </CalendarDownloadLinkStyled>
    );
}

const CalendarDownloadLinkStyled = styled.a`
    display: block;
    margin-bottom: 10px;
`;

const IconStyled = styled.img`
    height: 16px;
    margin-right: 10px;
`;

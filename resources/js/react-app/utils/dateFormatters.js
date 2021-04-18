// replace(' ', 'T') must be called because JavaScript throws an error on iOS elsewise.

export function formatToDateString(date) {
    return new Date(date.replace(' ', 'T')).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatToDateStringWithWeekday(date) {
    return getWeekdayAbbreviation(date) + ' ' + formatToDateString(date);
}

export function formatToDateTimeString(date) {
    return new Date(date.replace(' ', 'T')).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatToDateTimeStringWithWeekday(date) {
    return getWeekdayAbbreviation(date) + ' ' + formatToDateTimeString(date);
}

export function formatToTimeString(date) {
    return new Date(date.replace(' ', 'T')).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatToIsoDateString(date) {
    return new Date(date.replace(' ', 'T')).toISOString().split('T')[0];
}

export function formatToIcsString(date, surplusMinutes = 0) {
    const dateObject = new Date(date.replace(' ', 'T'));
    const offsetInHours = -dateObject.getTimezoneOffset() / 60;
    dateObject.setHours(dateObject.getHours() + offsetInHours);
    const newDateObject = addMinutes(dateObject, surplusMinutes);
    const isoString = newDateObject.toISOString();
    const icsString = isoString.slice(0, 19).replaceAll('-', '').replaceAll(':', '');
    return icsString;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

export function getWeekdayAbbreviation(date) {
    const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const weekdayNumber = new Date(date.replace(' ', 'T')).getDay();
    return weekdays[weekdayNumber];
}

// replace(' ', 'T') must be called because JavaScript throws an error on iOS elsewise.

export function formatToDateString(date) {
    return new Date(date.replace(' ', 'T')).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
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

export function formatToTimeString(date) {
    return new Date(date.replace(' ', 'T')).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatToIsoDateString(date) {
    return new Date(date.replace(' ', 'T')).toISOString().split('T')[0];
}

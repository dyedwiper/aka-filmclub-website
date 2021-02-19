export function formatToDateString(date) {
    return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatToDateTimeString(date) {
    return new Date(date).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatToTimeString(date) {
    return new Date(date).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatToIsoDateString(date) {
    return new Date(date).toISOString().split('T')[0];
}

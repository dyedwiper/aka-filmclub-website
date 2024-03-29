import { makeApiCall } from './baseService';

export function getScreenings() {
    return makeApiCall('/api/screenings');
}

export function getFutureScreenings() {
    return makeApiCall('/api/screenings/future');
}

export function getScreeningsBySemester(semester) {
    return makeApiCall('/api/screenings/semester/' + semester);
}

export function getScreeningByUuid(uuid) {
    return makeApiCall('/api/screenings/uuid/' + uuid);
}

export function getScreeningsBySearchString(search) {
    return makeApiCall('/api/screenings/search/' + search);
}

export function postScreening(data) {
    return makeApiCall('/api/screenings', 'POST', data);
}

export function deleteScreening(uuid) {
    return makeApiCall('/api/screenings/uuid/' + uuid, 'DELETE');
}

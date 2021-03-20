import { makeApiCall } from './baseService';

export function getSerials() {
    return makeApiCall('/api/serials');
}

export function getSerialsBySemester(semester) {
    return makeApiCall('/api/serials/semester/' + semester);
}

export function getSerialByUuid(uuid) {
    return makeApiCall('/api/serials/uuid/' + uuid);
}

export function getSerialsBySearchString(search) {
    return makeApiCall('/api/serials/search/' + search);
}

export function postSerial(data) {
    return makeApiCall('/api/serials', 'POST', data);
}

export function deleteSerial(uuid) {
    return makeApiCall('/api/serials/uuid/' + uuid, 'DELETE');
}

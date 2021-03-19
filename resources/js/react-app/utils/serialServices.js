import axios from 'axios';

export function getSerials() {
    return axios.get('/api/serials');
}

export function getSerialsBySemester(semester) {
    return axios.get('/api/serials/semester/' + semester);
}

export function getSerialByUuid(uuid) {
    return axios.get('/api/serials/uuid/' + uuid);
}

export function getSerialsBySearchString(search) {
    return axios.get('/api/serials/search/' + search);
}

export function postSerial(data) {
    return axios.post('/api/serials', data);
}

export function deleteSerial(uuid) {
    return axios.delete('/api/serials/uuid/' + uuid);
}

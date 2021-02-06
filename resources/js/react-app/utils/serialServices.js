import axios from 'axios';

export function getSerials() {
    return axios.get('/api/serials');
}

export function GetSerialsBySemester(semester) {
    return axios.get('/api/serials/semester/' + semester.season + '/' + semester.year);
}

export function getSerialByUuid(uuid) {
    return axios.get('/api/serials/single/' + uuid);
}

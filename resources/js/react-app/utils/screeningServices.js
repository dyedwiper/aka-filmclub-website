import axios from 'axios';

export function getScreenings() {
    return axios.get('/api/screenings');
}

export function getFutureScreenings() {
    return axios.get('/api/screenings/future');
}

export function getScreeningsBySemester(semester) {
    return axios.get('/api/screenings/semester/' + semester.season + '/' + semester.year);
}

export function getScreeningByUuid(uuid) {
    return axios.get('/api/screenings/single/' + uuid);
}

export function getScreeningsBySerialFk(serialFk) {
    return axios.get('/api/screenings/serial/' + serialFk);
}

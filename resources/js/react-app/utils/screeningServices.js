import axios from 'axios';

export function getScreenings() {
    return axios.get('/api/screenings');
}

export function getFutureScreenings() {
    return axios.get('/api/screenings/future');
}

export function getScreeningsBySemester(semester) {
    return axios.get('/api/screenings/semester/' + semester);
}

export function getScreeningByUuid(uuid) {
    return axios.get('/api/screenings/single/' + uuid);
}

export function getScreeningsBySearchString(search) {
    return axios.get('/api/screenings/search/' + search);
}

export function postScreening(data) {
    return axios.post('/api/screenings', data);
}

export function deleteScreening(uuid) {
    return axios.delete('/api/screenings/uuid/' + uuid);
}

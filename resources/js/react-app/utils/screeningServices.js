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

// export function getScreeningsBySerialId(serialId) {
//     return axios.get('/api/screenings/serial/' + serialId);
// }

export function postScreening(data) {
    return axios.post('/api/screenings', data);
}

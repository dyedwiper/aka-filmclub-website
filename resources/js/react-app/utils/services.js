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

export function getNotices() {
    return axios.get('/api/notices');
}

export function getNoticesByPage(page) {
    return axios.get('/api/notices?page=' + page);
}

export function getNoticesCount() {
    return axios.get('/api/notices/count');
}

export function getSerials() {
    return axios.get('/api/serials');
}

export function GetSerialsBySemester(semester) {
    return axios.get('/api/serials/semester/' + semester.season + '/' + semester.year);
}

export function getSerialByUuid(uuid) {
    return axios.get('/api/serials/single/' + uuid);
}

export function getImageById(id) {
    return axios.get('/api/serials/id' + id);
}

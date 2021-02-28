import axios from 'axios';

export function getNotices() {
    return axios.get('/api/notices');
}

export function getNoticesByPage(page) {
    return axios.get('/api/notices?page=' + page);
}

export function getNoticesCount() {
    return axios.get('/api/notices/count');
}

export function getNoticeByUuid(uuid) {
    return axios.get('/api/notices/uuid/' + uuid);
}

export function postNotice(data) {
    return axios.post('/api/notices', data);
}

export function deleteNotice(uuid) {
    return axios.delete('/api/notices/uuid/' + uuid);
}

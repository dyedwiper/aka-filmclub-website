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

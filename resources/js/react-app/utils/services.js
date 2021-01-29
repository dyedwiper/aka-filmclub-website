import axios from 'axios';

export function getScreenings() {
    return axios.get('/api/screenings');
}

export function getNotices() {
    return axios.get('/api/notices');
}

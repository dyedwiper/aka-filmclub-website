import axios from 'axios';

export function getText(page) {
    return axios.get('/api/texts/' + page);
}

export function postText(page, data) {
    return axios.post('/api/texts/' + page, data);
}

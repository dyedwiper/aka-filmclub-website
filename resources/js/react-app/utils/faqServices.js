import axios from 'axios';

export function getFaqs() {
    return axios.get('/api/faqs');
}

export function postFaq(data) {
    return axios.post('/api/faqs', data);
}

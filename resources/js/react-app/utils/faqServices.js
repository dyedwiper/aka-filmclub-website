import axios from 'axios';

export function getFaqs() {
    return axios.get('/api/faqs');
}

export function getFaqByUuid(uuid) {
    return axios.get('/api/faqs/uuid/' + uuid);
}

export function postFaq(data) {
    return axios.post('/api/faqs', data);
}

export function deleteFaq(uuid) {
    return axios.delete('/api/faqs/uuid/' + uuid);
}

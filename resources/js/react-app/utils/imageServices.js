import axios from 'axios';

export function getImageById(id) {
    return axios.get('/api/serials/id' + id);
}

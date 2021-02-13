import axios from 'axios';

export function getImageById(id) {
    return axios.get('/api/images/id/' + id);
}

export function getImageByUuid(uuid) {
    return axios.get('/api/images/uuid/' + uuid);
}

export function patchImage(data) {
    return axios.patch('/api/images', data);
}

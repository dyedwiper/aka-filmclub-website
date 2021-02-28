import axios from 'axios';

export function getImageById(id) {
    return axios.get('/api/images/id/' + id);
}

export function getImageByUuid(uuid) {
    return axios.get('/api/images/uuid/' + uuid);
}

export function postImage(data) {
    return axios.post('/api/images', data);
}

export function deleteImage(uuid) {
    return axios.delete('/api/images/uuid/' + uuid);
}

import axios from 'axios';

export function getImageById(id) {
    return axios.get('/api/images/id/' + id);
}

export function getImageByUuid(uuid) {
    return axios.get('/api/images/uuid/' + uuid);
}

export function patchImage(data) {
    // HTML forms can't make PATCH requests. That's why this is a POST request.
    // The PATCH method is spoofed with a hidden input.
    // See https://laravel.com/docs/8.x/blade#method-field
    return axios.post('/api/images', data);
}

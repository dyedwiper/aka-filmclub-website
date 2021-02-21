import axios from 'axios';

export function getUsers() {
    return axios.get('/api/users');
}

export function getCsrfCookie() {
    return axios.get('/sanctum/csrf-cookie');
}

export function postLogin(data) {
    return axios.post('/api/users/login', data);
}

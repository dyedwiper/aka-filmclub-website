import axios from 'axios';

export function getUsers() {
    return axios.get('/api/users');
}

export function getCurrentUser() {
    return axios.get('/api/users/currentUser');
}

export function getUserByUuid(uuid) {
    return axios.get('/api/users/uuid/' + uuid);
}

export function getCsrfCookie() {
    return axios.get('/sanctum/csrf-cookie');
}

export function postLogin(data) {
    return axios.post('/api/users/login', data);
}

export function getLogout() {
    return axios.get('/api/users/logout');
}

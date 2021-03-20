import axios from 'axios';
import { makeApiCall } from './baseService';

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
    // return axios.post('/api/users/login', data);
    return makeApiCall('/api/users/login', 'POST', data);
}

export function getLogout() {
    return axios.get('/api/users/logout');
}

export function postUser(data) {
    return axios.post('/api/users', data);
}

export function deleteUser(uuid) {
    return axios.delete('/api/users/uuid/' + uuid);
}

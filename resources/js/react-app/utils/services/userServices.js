import { makeApiCall } from './baseService';

export function getUsers() {
    return makeApiCall('/api/users');
}

export function getCurrentUser() {
    return makeApiCall('/api/users/currentUser');
}

export function getUserByUuid(uuid) {
    return makeApiCall('/api/users/uuid/' + uuid);
}

export function getCsrfCookie() {
    return makeApiCall('/sanctum/csrf-cookie');
}

export function postLogin(data) {
    return makeApiCall('/api/users/login', 'POST', data);
}

export function getLogout() {
    return makeApiCall('/api/users/logout');
}

export function postUser(data) {
    return makeApiCall('/api/users', 'POST', data);
}

export function postPassword(data) {
    return makeApiCall('/api/users/password', 'POST', data);
}

export function deleteUser(uuid) {
    return makeApiCall('/api/users/uuid/' + uuid, 'DELETE');
}

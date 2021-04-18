import { makeApiCall } from './baseService';

export function getSelfmadeFilms() {
    return makeApiCall('/api/selfmadeFilms');
}

export function getSelfmadeFilmByUuid(uuid) {
    return makeApiCall('/api/selfmadeFilms/uuid/' + uuid);
}

export function postSelfmadeFilm(data) {
    return makeApiCall('/api/selfmadeFilms', 'POST', data);
}

export function deleteSelfmadeFilm(uuid) {
    return makeApiCall('/api/selfmadeFilms/uuid/' + uuid, 'DELETE');
}

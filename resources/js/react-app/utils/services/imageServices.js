import { makeApiCall } from './baseService';

export function getImageByUuid(uuid) {
    return makeApiCall('/api/images/uuid/' + uuid);
}

export function postImage(data) {
    return makeApiCall('/api/images', 'POST', data);
}

export function deleteImage(uuid) {
    return makeApiCall('/api/images/uuid/' + uuid, 'DELETE');
}

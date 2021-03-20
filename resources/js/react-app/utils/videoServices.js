import { makeApiCall } from './baseService';

export function getVideos() {
    return makeApiCall('/api/videos');
}

export function getVideoByUuid(uuid) {
    return makeApiCall('/api/videos/uuid/' + uuid);
}

export function postVideo(data) {
    return makeApiCall('/api/videos', 'POST', data);
}

export function deleteVideo(uuid) {
    return makeApiCall('/api/videos/uuid/' + uuid, 'DELETE');
}

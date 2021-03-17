import axios from 'axios';

export function getVideos() {
    return axios.get('/api/videos');
}

export function getVideoByUuid(uuid) {
    return axios.get('/api/videos/uuid/' + uuid);
}

export function postVideo(data) {
    return axios.post('/api/videos', data);
}

export function deleteVideo(uuid) {
    return axios.delete('/api/videos/uuid/' + uuid);
}

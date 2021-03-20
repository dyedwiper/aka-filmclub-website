import { makeApiCall } from './baseService';

export function getNotices() {
    return makeApiCall('/api/notices');
}

export function getNoticesByPage(page) {
    return makeApiCall('/api/notices?page=' + page);
}

export function getNoticesCount() {
    return makeApiCall('/api/notices/count');
}

export function getNoticeByUuid(uuid) {
    return makeApiCall('/api/notices/uuid/' + uuid);
}

export function postNotice(data) {
    return makeApiCall('/api/notices', 'POST', data);
}

export function deleteNotice(uuid) {
    return makeApiCall('/api/notices/uuid/' + uuid, 'DELETE');
}

import { makeApiCall } from './baseService';

export function getText(page) {
    return makeApiCall('/api/texts/' + page);
}

export function postText(page, data) {
    return makeApiCall('/api/texts/' + page, 'POST', data);
}

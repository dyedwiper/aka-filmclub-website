import { makeApiCall } from './baseService';

export function getFaqs() {
    return makeApiCall('/api/faqs');
}

export function getFaqByUuid(uuid) {
    return makeApiCall('/api/faqs/uuid/' + uuid);
}

export function postFaq(data) {
    return makeApiCall('/api/faqs', 'POST', data);
}

export function deleteFaq(uuid) {
    return makeApiCall('/api/faqs/uuid/' + uuid, 'DELETE');
}

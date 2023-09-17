import { makeApiCall } from './baseService';

export function getScreeningsWithBillingsBySemester(semester) {
    return makeApiCall('/api/billings/semester/' + semester);
}

export function getBillingByUuid(uuid) {
    return makeApiCall('/api/billings/uuid/' + uuid);
}

export function postBilling(data) {
    return makeApiCall('/api/billings', 'POST', data);
}

export function deleteBilling(uuid) {
    return makeApiCall('/api/billings/uuid/' + uuid, 'DELETE');
}

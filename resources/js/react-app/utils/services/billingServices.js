import { makeApiCall } from './baseService';

export function getScreeningsWithBillingsBySemester(semester) {
    return makeApiCall('/api/billings/semester/' + semester);
}

export function getBillingByUuid(uuid) {
    return makeApiCall('/api/billings/uuid/' + uuid);
}

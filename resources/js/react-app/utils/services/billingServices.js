import { makeApiCall } from './baseService';

export function getBillingsBySemester(semester) {
    return makeApiCall('/api/billings/semester/' + semester);
}

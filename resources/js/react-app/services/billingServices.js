import { removeDots } from '../utils/stringUtils';
import { makeApiCall } from './baseService';

export function getScreeningsWithBillingsBySemester(semester) {
    return makeApiCall('/api/billings/semester/' + semester);
}

export function getBillingByUuid(uuid) {
    return makeApiCall('/api/billings/uuid/' + uuid);
}

export function postBilling(data) {
    // Remove dots from localized currency strings to make them processable for the backend
    const fieldsToRemoveDotsFrom = [
        'guarantee',
        'incidentals',
        'cashInlay',
        'cashOut',
        'additionalEarnings',
        'additionalExpenses',
    ];
    fieldsToRemoveDotsFrom.forEach((field) => {
        const value = data.get(field);
        data.set(field, removeDots(value));
    });

    return makeApiCall('/api/billings', 'POST', data);
}

export function deleteBilling(uuid) {
    return makeApiCall('/api/billings/uuid/' + uuid, 'DELETE');
}

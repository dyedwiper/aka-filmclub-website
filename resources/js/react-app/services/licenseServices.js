import { makeApiCall } from './baseService';

export function getLicenses() {
    return makeApiCall('/api/licenses');
}

export function getLicenseByUuid(uuid) {
    return makeApiCall('/api/licenses/uuid/' + uuid);
}

export function postLicense(data) {
    return makeApiCall('/api/licenses', 'POST', data);
}

export function deleteLicense(uuid) {
    return makeApiCall('/api/licenses/uuid/' + uuid, 'DELETE');
}

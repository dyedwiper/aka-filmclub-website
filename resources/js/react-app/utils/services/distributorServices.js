import { makeApiCall } from './baseService';

export function getDistributors() {
    return makeApiCall('/api/distributors');
}

export function getDistributorByUuid(uuid) {
    return makeApiCall('/api/distributors/uuid/' + uuid);
}

export function postDistributor(data) {
    return makeApiCall('/api/distributors', 'POST', data);
}

export function deleteDistributor(uuid) {
    return makeApiCall('/api/distributors/uuid/' + uuid, 'DELETE');
}

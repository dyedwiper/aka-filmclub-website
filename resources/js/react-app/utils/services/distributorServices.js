import { makeApiCall } from './baseService';

export function getDistributors() {
    return makeApiCall('/api/distributors');
}

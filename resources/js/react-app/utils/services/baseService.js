import axios from 'axios';

export function makeApiCall(url, method = 'GET', data = null) {
    return axios({
        method: method,
        url: url,
        data: data,
    }).catch((err) => {
        if (err.response) {
            if (err.response.status >= 500) {
                window.location = '/error';
            } else {
                throw err;
            }
        } else {
            window.location = '/error';
        }
    });
}

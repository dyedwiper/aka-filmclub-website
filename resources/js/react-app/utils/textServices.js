import axios from 'axios';

export function getAboutText() {
    return axios.get('/api/texts/about');
}

import axios from 'axios';

axios.defaults.withCredentials = true;

export default () => {
    return axios.create({
        baseURL: `http://localhost:3500/api`,
        headers: {
            // Authorization: `Bearer ${store.state.token}`
        },
    });
};

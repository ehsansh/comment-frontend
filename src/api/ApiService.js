import Api from './Api';
import axios from 'axios';

export default {
    login(params) {
        return Api().post('login', params);
    },
    comments() {
        return Api().get('comments');
    },
    addComment(params) {
        return Api().post('comments', params);
    },
};

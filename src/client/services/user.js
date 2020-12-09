import axios from 'axios';

const LOGIN_ENDPOINT = '/api/user/login';
export const login = (credentials) => {
    //TODO:Front-end validating.
    return axios.post(LOGIN_ENDPOINT, credentials);
};
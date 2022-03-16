import axios, {AxiosRequestConfig} from 'axios';
import {AUTHTOKENKEY} from '../constants';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export default instance;

const getAccessToken = () => {
    return localStorage.getItem(AUTHTOKENKEY);
}

instance.interceptors.request.use(
    (request: AxiosRequestConfig) => {
        // @ts-ignore
        request.headers!.common['Authorization'] = `Bearer ${getAccessToken()}`;
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

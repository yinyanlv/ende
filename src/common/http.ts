import axios from 'axios';
import {message} from 'antd';

import {API_PREFIX} from '@/config';

// 每次请求携带cookies信息
// axios.defaults.withCredentials = true;

export const instance = axios.create({
    baseURL: API_PREFIX,
    timeout: 20 * 1000
});

class Http {

    constructor() {
        this._setInterceptors();
    }

    private _setInterceptors() {

        instance.interceptors.request.use((config) => {

            // config.headers.Authorization = `Bearer ${accessToken}`;

            return config;
        }, (err) => {
            return Promise.reject(err);
        });

        instance.interceptors.response.use((res) => {
            return res;
        }, (err) => {
            return new Promise((resolve, reject) => {
                message.error('Network error!');
                reject(err);
            });
        });
    }

    get(url) {
        return new Promise((resolve, reject) => {
            instance.get(url)
                .then((res) => {
                    const body = res.data;

                    if (body.success) {
                        resolve(body.result);
                    } else if (body.list) {
                        resolve(body);
                    } else {
                        reject(new Error(body.message || 'Unknown error!'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    post(url, params: any = null) {

        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then((res) => {
                    const body = res.data;

                    if (body.success) {
                        resolve(body.result);
                    } else if (body.list) {
                        resolve(body);
                    } else {
                        reject(new Error(body.message || 'Unknown error!'));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export const http = new Http();

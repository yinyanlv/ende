import axios from 'axios';
import {message} from 'antd';
import queryString from 'query-string';
import history from '@/common/history';

import {API_PREFIX} from '@/config';
import {rejects} from 'assert';

// 每次请求携带cookies信息
axios.defaults.withCredentials = true;

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
            this.handleError(err);
            return Promise.reject(err);
        });
    }

    handleError(err) {
        const res = err.response;

        if (!res) {
           return history.push({
               pathname: '/599'
           });
        }

        if (res.status === 401) {

            if (res.config.url === '/sys/config') {
                let message = res.data.message;
                const host = message.authHost;
                const queryObj = {
                    client_id: message.clientId,
                    redirect_uri: window.location.href,
                    response_type: message.responseType,
                    scope: message.scope,
                    grant_type: message.grantType
                };
                const url = host + '?' + queryString.stringify(queryObj);
                window.location.href = url;
            }
        }
    }

    get(url) {
        return new Promise((resolve, reject) => {
            instance.get(url)
                .then((res) => {
                    const body = res.data;

                    if (body.success) {
                        if (body.list) {
                            resolve(body);
                        } else {
                            resolve(body.result);
                        }
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
                        if (body.list) {
                           resolve(body);
                        } else {
                            resolve(body.result);
                        }
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

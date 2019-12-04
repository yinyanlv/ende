import axios from 'axios';
import {message} from 'antd';
import jwtDecode from 'jwt-decode';
import {API_PREFIX} from '@/config';

export const instance = axios.create({
    baseURL: API_PREFIX,
    timeout: 10000
});

class Http {

    private _storageKey = 'jwt_access_token';
    private _headersAuthorizeKey = 'Authorization';

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

    private _authorize() {
        const accessToken = this.getAccessToken();

        if (!accessToken) {
            return;
        }

        if (this._isAccessTokenValid(accessToken)) {
            this.setAccessToken(accessToken);

        } else {
            this.removeAccessToken();
        }
    }

    private _isAccessTokenValid(accessToken: string) {

        if (!accessToken) {
            return false;
        }

        const decoded: any = jwtDecode(accessToken);
        const current = Date.now() / 1000;
        if (decoded.exp < current) {
            console.warn('jwt access token is expired!');
            return false;
        } else {
            return true;
        }
    }

    private setAccessToken(accessToken: string): void {
        localStorage.setItem(this._storageKey, accessToken);
        instance.defaults.headers.common[this._headersAuthorizeKey] = `Bearer ${accessToken}`;
    }

    removeAccessToken() {
        localStorage.removeItem(this._storageKey);
        delete instance.defaults.headers.common[this._headersAuthorizeKey];
    }

    getAccessToken() {
        return localStorage.getItem(this._storageKey);
    }

    get(url) {
        return new Promise((resolve, reject) => {
            instance.get(url)
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
                        resolve(data.result);
                    } else {
                        reject(new Error(data.message));
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export const http = new Http();

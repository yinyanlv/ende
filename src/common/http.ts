import axios from 'axios';
import {API_PREFIX} from '@/config';

class Http {
    get(url, params?) {
        return new Promise((resolve, reject) => {

            axios.get(API_PREFIX + url)
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
                        resolve(data.result);
                    } else {
                        reject(new Error(data.message));
                    }
                })
                .catch(() => {
                    reject(new Error('Network error!'));
                });
        });
    }
}

export const http = new Http();
import {instance} from '@/common/http';
import {EventEmitter} from '@/common/EventEmitter';

class StorageService extends EventEmitter {

    private _tokenKey = 'token';
    private _langKey = 'lang';
    private _headersTokenKey = 'authorization';
    private _headersLangKey = 'lang';

    init() {
        this._authorize();
    }

    private _authorize(): boolean {
        const token = this.getToken();

        if (!token) {
            this._removeStorage();
            this.emit('unauthorized', 'Invalid token!');
            return false;
        } else {
            this.emit('authorized', true);
            return true;
        }
    }

    private _setStorage(params: { token: string, lang: string }): void {
        localStorage.setItem(this._tokenKey, params.token);
        localStorage.setItem(this._langKey, params.lang);
        instance.defaults.headers.common[this._headersTokenKey] = `Bearer ${params.token}`;
        instance.defaults.headers.common[this._headersLangKey] = `${params.lang}`;
    }

    private _removeStorage(): void {
        localStorage.removeItem(this._tokenKey);
        localStorage.removeItem(this._langKey);
        delete instance.defaults.headers.common[this._headersTokenKey];
        delete instance.defaults.headers.common[this._headersTokenKey];
    }

    getToken() {
        return localStorage.getItem(this._tokenKey) || '';
    }

    getLang() {
        return localStorage.getItem(this._langKey) || '';
    }

    getStorage() {
        return {
            token: this.getToken(),
            lang: this.getLang()
        };
    }
}

export const storageService = new StorageService();

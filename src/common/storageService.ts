import {instance} from '@/common/http';
import {EventEmitter} from '@/common/EventEmitter';

class StorageService extends EventEmitter {

    private _tokenKey = 'token';
    private _langKey = 'lang';
    private _returnUrlKey = 'return-url';
    private _headersTokenKey = 'Authorization';
    private _headersLangKey = 'Lang';

    initHttpHeadersFromStorage(): void {
        const params = this.getStorage();
        this.setHttpHeaders(params);
    }

    setHttpHeaders(params): void {
        instance.defaults.headers.common[this._headersTokenKey] = `Bearer ${params.token}`;
        instance.defaults.headers.common[this._headersLangKey] = `${params.lang}`;
    }

    removeHttpHeaders(): void {
        delete instance.defaults.headers.common[this._headersTokenKey];
        delete instance.defaults.headers.common[this._headersTokenKey];
    }

    setStorage(params: { token: string, lang: string }): void {
        localStorage.setItem(this._tokenKey, params.token);
        localStorage.setItem(this._langKey, params.lang);
        this.setHttpHeaders(params);
    }

    removeStorage(): void {
        localStorage.removeItem(this._tokenKey);
        localStorage.removeItem(this._langKey);
        this.removeHttpHeaders();
    }

    getToken(): string {
        return localStorage.getItem(this._tokenKey) || '';
    }

    getStorage(): { token: string, lang: string } {
        return {
            token: this.getToken(),
            lang: this.getLang()
        };
    }

    setLang(lang: string): void {
        localStorage.setItem(this._langKey, lang);
    }

    getLang(): string {
        return localStorage.getItem(this._langKey) || 'zh';
    }

    removeLang(): void {
        localStorage.removeItem(this._langKey);
    }

    setReturnUrl(returnUrl: string): void {
        localStorage.setItem(this._returnUrlKey, returnUrl);
    }

    getReturnUrl(): string {
        return localStorage.getItem(this._returnUrlKey) || '/';
    }

    removeReturnUrl(): void {
        localStorage.removeItem(this._returnUrlKey);
    }
}

export const storageService = new StorageService();

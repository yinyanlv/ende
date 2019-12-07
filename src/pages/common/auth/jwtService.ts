import jwtDecode from 'jwt-decode';
import {instance} from '@/common/http';
import {EventEmitter} from '@/common/EventEmitter';

class JwtService extends EventEmitter{

    private _storageKey = 'jwt_access_token';
    private _headersTokenKey = 'Authorization';

    init() {
        this._authorize();
    }

    private _authorize(): boolean {
        // const accessToken = this.getAccessToken();

        this.emit('authorized', true);
        return true;

        // if (!accessToken) {
        //     this.emit('unauthorized', 'Invalid access token!');
        //     return false;
        // }
        //
        // if (this._isAccessTokenValid(accessToken)) {
        //     this.setAccessToken(accessToken);
        //     this.emit('authorized', true);
        //     return true;
        // } else {
        //     this.removeAccessToken();
        //     this.emit('unauthorized', 'Invalid access token!');
        //     return false;
        // }
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
        instance.defaults.headers.common[this._headersTokenKey] = `Bearer ${accessToken}`;
    }

    removeAccessToken() {
        localStorage.removeItem(this._storageKey);
        delete instance.defaults.headers.common[this._headersTokenKey];
    }

    getAccessToken() {
        return localStorage.getItem(this._storageKey) || '';
    }
}

export const jwtService = new JwtService();

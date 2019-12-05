import React, {PureComponent} from 'react';
import {jwtService} from './jwtService';
import {http} from '@/common/http';

interface AuthProps {
}

export class Auth extends PureComponent<AuthProps> {

    constructor(props) {
        super(props);
        this._jwtInit();
    }

    private _jwtInit() {

        jwtService.on('authorized', () => {
            http.get('/sys/config')
                .then((data) => {
                   console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        jwtService.on('unauthorized', () => {
            jwtService.removeAccessToken();
        });

        jwtService.init();
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

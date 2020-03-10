import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {storageService} from '@/common/storageService';
import {http} from '@/common/http';
import {Loading} from '@/components/loading';
import {configCreator} from '@/store/config/actions';

interface AuthProps {
    dispatch: any;
}

class InnerAuth extends PureComponent<AuthProps> {

    state = {
        isLoading: true
    };

    constructor(props) {
        super(props);
        this._jwtInit();
    }

    private _jwtInit() {

        storageService.on('authorized', () => {
            http.get('/sys/config')
                .then((data) => {
                   this.props.dispatch(configCreator.setConfig(data));
                   this.setState({
                       isLoading: false
                   });
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        storageService.on('unauthorized', () => {
            http.get('/sys/config')
                .then((data) => {
                    this.props.dispatch(configCreator.setConfig(data));
                    this.setState({
                        isLoading: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        storageService.init();
    }

    render() {

        if (this.state.isLoading) {
            return (
                <Loading isLoading={this.state.isLoading}>
                    <div style={{width: '100%', height: '100vh'}}></div>
                </Loading>
            );
        }

        return (
            <>
                {this.props.children}
            </>
        );
    }
}


export const Auth = connect()(InnerAuth);

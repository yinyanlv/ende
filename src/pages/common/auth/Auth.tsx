import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {storageService} from '@/common/storageService';
import {getHashObj} from '@/common/utils';
import {http} from '@/common/http';
import history from '@/common/history';
import {Loading} from '@/components/loading';
import {configCreator} from '@/store/config/actions';

export function Auth(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const hashObj = getHashObj();

    useEffect(() => {
        if (hashObj && hashObj.access_token) {
            storageService.setStorage({
                token: hashObj.access_token as any,
                lang: 'zh'
            });
            history.push({
                pathname: history.location.pathname,
                search: history.location.search,
                hash: ''
            });
        } else {
            storageService.initHttpHeadersFromStorage();
        }
    }, []);

    useEffect(() => {
        http.get('/sys/config')
            .then((data) => {
                dispatch(configCreator.setConfig(data));
                setIsLoading(false);
            })
            .catch((err) => {
                const res = err.response;
                if (res.status !== 401) {
                    setIsLoading(false);
                    history.push({
                        pathname: '/599'
                    });
                }
            });
    }, []);

    if (isLoading) {
        return (
            <Loading isLoading={isLoading}>
                <div style={{width: '100%', height: '100vh'}}></div>
            </Loading>
        );
    }

    return (
        <>
            {props.children}
        </>
    );
}


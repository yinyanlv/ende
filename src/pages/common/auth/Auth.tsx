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

        if (history.location.pathname === '/auth-callback' && hashObj) {
            if (hashObj.access_token) {
                const returnUrl = storageService.getReturnUrl();
                let lang;

                // 如果returnUrl中包含locale，则以returnUrl为准
                if (returnUrl.includes('#locale=')) {
                    const match = returnUrl.match(/#locale=(.*)$/) || [];
                    lang = match[1] ? match.slice(0, 2) : 'zh';
                } else {
                    lang = hashObj.locale ? hashObj.locale.slice(0, 2) as string :'zh'
                }
                storageService.setStorage({
                    token: hashObj.access_token as any,
                    lang: lang
                });
                window.location.href =  returnUrl.replace(/#locale=(.*)$/, '');
            } else {
                storageService.setStorage({
                    token: '',
                    lang: hashObj.locale ? hashObj.locale.slice(0, 2) as string :'zh'
                });
                history.push({
                    pathname: '/403'
                });
            }
        } else if (hashObj && hashObj.locale) {
            storageService.setLang(hashObj.locale.slice(0, 2) as string);
            storageService.initHttpHeadersFromStorage();
            // 清空hash中的locale，避免切换语言时一直以url为准，导致不能切换语言
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
                if (!res || (res && res.status !== 401)) {
                    setIsLoading(false);
                    if (res.status === 403) {
                        history.push({
                            pathname: '/403'
                        });
                    } else {
                        history.push({
                            pathname: '/599'
                        });
                    }
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


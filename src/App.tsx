import React, {useEffect, useState, Suspense} from 'react';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import { ConfigProvider } from 'antd';
import './App.module.scss';
import store from './store';
import history from './common/history';
import {FitLayout} from '@/layouts/fit-layout';
import {Auth} from '@/pages/common/auth';
import {RouteProgress} from '@/components/route-progress';

import {zh_CN} from '@/locales/zh';
import {en_US} from '@/locales/en';

const App: React.FC = () => {

    const defaultLocale = navigator.language.split('_')[0];
    const [locale, setLocale] = useState(defaultLocale);
    const messages = getLocaleMessages(locale);

    return (
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <ConfigProvider>
                    <Router history={history}>
                        <Suspense fallback={<RouteProgress />}>
                            <Auth>
                                <Switch>
                                    <Route path={'/'}>
                                        <FitLayout />
                                    </Route>
                                </Switch>
                            </Auth>
                        </Suspense>
                    </Router>
                </ConfigProvider>
            </IntlProvider>
        </Provider>
    );
};

function getLocaleMessages(lang) {
    lang = lang || navigator.language.split('_')[0];

    switch (lang) {
        case 'en':
            return en_US;
        case 'zh':
        default:
            return zh_CN;
    }
}

export default App;
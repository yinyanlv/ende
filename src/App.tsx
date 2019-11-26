import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import './App.module.scss';
import store from './store';
import history from './common/history';
import {FitLayout} from '@/layouts/FitLayout';
import {Auth} from '@/components/Auth';
import {zh_CN} from '@/locales/zh';
import {en_US} from '@/locales/en';

const App: React.FC = () => {

    const defaultLocale = navigator.language.split('_')[0];
    const [locale, setLocale] = useState(defaultLocale);
    const messages = getLocaleMessages(locale);

    return (
        <Provider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                <Router history={history}>
                    <Auth>
                        <Switch>
                            <Route path={'/'}>
                                <FitLayout />
                            </Route>
                        </Switch>
                    </Auth>
                </Router>
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

import React from 'react';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import './App.module.scss';
import store from './store';
import history from './common/history';
import {FitLayout} from '@/layouts/FitLayout';
import {Auth} from '@/components/Auth';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Auth>
                    <Switch>
                        <Route path={'/'}>
                            <FitLayout />
                        </Route>
                    </Switch>
                </Auth>
            </Router>
        </Provider>
    );
};

export default App;

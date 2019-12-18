import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import './App.module.scss';
import store from './store';
import history from './common/history';
import {FitLayout} from '@/layouts/fit-layout';
import {Auth} from '@/pages/common/auth';
import {RouteProgress} from '@/components/route-progress';
import {Intl} from '@/pages/common/intl';

const App: React.FC = () => {

    return (
        <Provider store={store}>
            <Intl>
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
            </Intl>
        </Provider>
    );
};


export default App;

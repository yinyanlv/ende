import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PageError from '@/pages/error';

const PagePrintLegend = React.lazy(() => import('@/pages/print-legend'));

export function AutoLayout() {
    return (
        <Switch>
            <Route path={'/print-legend'} exact>
                <PagePrintLegend />
            </Route>
            <Route path={'/404'} exact>
                <PageError/>
            </Route>
            <Redirect to={'/404'}/>
        </Switch>
    );
}

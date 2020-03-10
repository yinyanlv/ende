import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PageError from '@/pages/error';
import {getText} from '@/pages/common/intl';

const PagePrintLegend = React.lazy(() => import('@/pages/print-legend'));

export function AutoLayout() {
    return (
        <Switch>
            <Route path={'/print-legend'} exact>
                <PagePrintLegend />
            </Route>
            <Route path={'/404'} exact>
                <PageError status={'404'} title={'404'} subTitle={getText('error.a2')}/>
            </Route>
            <Route path={'/599'} exact>
                <PageError status={'500'} title={'500'} subTitle={getText('error.a3')}/>
            </Route>
            <Redirect to={'/404'}/>
        </Switch>
    );
}

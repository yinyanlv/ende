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
                <PageError status={'404'} title={'404'} subTitle={'对不起，您所访问的页面不存在！'}/>
            </Route>
            <Route path={'/599'} exact>
                <PageError status={'500'} title={'500'} subTitle={'对不起，服务器端出错！'}/>
            </Route>
            <Redirect to={'/404'}/>
        </Switch>
    );
}

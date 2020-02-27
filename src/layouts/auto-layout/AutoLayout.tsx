import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PagePrintLegend = React.lazy(() => import('@/pages/print-legend'));
const PageError = React.lazy(() => import('@/pages/error'));

export function AutoLayout() {
    return (
        <>
            <Route path={'/print-legend'} exact>
                <PagePrintLegend />
            </Route>
            <Route path={'/404'} exact>
                <PageError/>
            </Route>
            <Redirect to={'/404'} />
        </>
    );
}

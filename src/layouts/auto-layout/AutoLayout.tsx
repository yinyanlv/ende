import React from 'react';
import styles from './AutoLayout.module.scss';
import {Route} from 'react-router-dom';

const PagePrintLegend = React.lazy(() => import('@/pages/print-legend'));

export function AutoLayout(props) {

    return (
        <>
            <Route path={'/print-legend'}>
                <PagePrintLegend />
            </Route>
        </>
    );
}

import React from 'react';
import styles from './FitLayout.module.scss';
import {Route} from 'react-router-dom';
import {Header} from '@/components/header';

const PageCatalog = React.lazy(() => import('@/pages/catalog'));
const PageUsage = React.lazy(() => import('@/pages/usage'));

export class FitLayout extends React.PureComponent {

    render() {
        return (
            <>
                <Header />
                <section className={styles.container}>
                    <Route path="/usage" exact>
                        <PageUsage />
                    </Route>
                    <Route path="/" exact>
                        <PageCatalog />
                    </Route>
                </section>
            </>
        );
    }
}

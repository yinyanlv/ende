import React from 'react';
import styles from './FitLayout.module.scss';
import {Route} from 'react-router-dom';
import {Header} from '@/pages/common/header';
import {Crumbs} from '@/pages/common/crumbs';

const PageCatalog = React.lazy(() => import('@/pages/catalog'));
const PageUsage = React.lazy(() => import('@/pages/usage'));
const PagePart = React.lazy(() => import('@/pages/part'));
const PageShoppingCart = React.lazy(() => import('@/pages/shopping-cart'));

export function FitLayout(props) {

    return (
        <>
            <Header />
            <Crumbs />
            <section className={styles.mainContainer}>
                <Route path="/usage" exact>
                    <PageUsage />
                </Route>
                <Route path="/part/:id" exact>
                    <PagePart />
                </Route>
                <Route path="/shopping-cart" exact>
                    <PageShoppingCart />
                </Route>
                <Route path="/" exact>
                    <PageCatalog />
                </Route>
            </section>
        </>
    );
}

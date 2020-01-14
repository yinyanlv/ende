import React from 'react';
import styles from './FitLayout.module.scss';
import {Route} from 'react-router-dom';
import {Header} from '@/pages/common/header';
import {Crumbs} from '@/pages/common/crumbs';
import {Search} from '@/pages/common/search';
import {VinDetail} from '@/pages/common/vin-detail';
import {ShoppingCart} from '@/pages/common/shopping-cart';

const PageCatalog = React.lazy(() => import('@/pages/catalog'));
const PageUsage = React.lazy(() => import('@/pages/usage'));
const PagePart = React.lazy(() => import('@/pages/part'));

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
                <Route path="/" exact>
                    <PageCatalog />
                </Route>
            </section>
            <Search/>
            <VinDetail/>
            <ShoppingCart/>
        </>
    );
}

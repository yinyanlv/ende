import React, {useEffect} from 'react';
import styles from './FitLayout.module.scss';
import {Route} from 'react-router-dom';
import {Header} from '@/pages/common/header';
import {Crumbs} from '@/pages/common/crumbs';
import {Search} from '@/pages/common/search';
import {VsnSelector} from '@/pages/common/vsn-selector';
import {VinDetail} from '@/pages/common/vin-detail';
import {ShoppingCart} from '@/pages/common/shopping-cart';
import {PartDetail} from '@/pages/common/part-detail';
import {Collect} from '@/pages/common/collect';

const PageCatalog = React.lazy(() => import('@/pages/catalog'));
const PageUsage = React.lazy(() => import('@/pages/usage'));
const PageOrders = React.lazy(() => import('@/pages/orders'));
const PageOrderDetail = React.lazy(() => import('@/pages/order-detail'));

export function FitLayout() {

    useEffect(() => {
        document.body.style.overflow = 'hidden;';
    }, []);
    return (
        <>
            <Header />
            <Crumbs />
            <section className={styles.mainContainer}>
                <Route path="/" exact>
                    <PageCatalog />
                </Route>
                <Route path="/usage" exact>
                    <PageUsage />
                </Route>
                <Route path="/orders" exact>
                    <PageOrders />
                </Route>
                <Route path="/order/:id" exact>
                    <PageOrderDetail />
                </Route>
            </section>
            <Collect/>
            <Search/>
            <ShoppingCart/>
            <PartDetail/>
            <VsnSelector />
            <VinDetail/>
        </>
    );
}

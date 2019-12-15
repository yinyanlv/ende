import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from 'react-router';
import queryString from 'query-string';
import {brandsCreator} from '@/pages/catalog/brands/actions';
import {conditionsCreator} from '@/pages/catalog/conditions/actions';
import styles from './Catalog.module.scss';
import {Brands} from './brands';
import {Conditions} from './conditions';

interface PageCatalogProps {
}

export function PageCatalog(props: PageCatalogProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const {
        activeM1Code,
        activeM2Code,
    } = useSelector((state: any) => {
        return state.brands;
    });

    useEffect(() => {
        if (location.search) {
            const queryObj = queryString.parse(location.search);
            dispatch(brandsCreator.load(queryObj));
        } else {
            dispatch(brandsCreator.load());
        }

        dispatch(conditionsCreator.beforeLoad());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <>
            <div className={styles.container}>
                <Brands />
                <Conditions activeM1Code={activeM1Code} activeM2Code={activeM2Code} />
            </div>
        </>
    );
}

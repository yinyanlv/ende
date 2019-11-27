import React from 'react';
import styles from './FitLayout.module.scss';
import {Header} from '@/components/header';
import {PageCatalog} from '@/pages/catalog';

export class FitLayout extends React.PureComponent {

    render() {
        return (
            <>
                <Header />
                <section className={styles.container}>
                    <PageCatalog />
                </section>
            </>
        );
    }
}

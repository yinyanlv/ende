import React from 'react';
import styles from './FitLayout.module.scss';
import {Header} from '@/components/Header';
import {PageCatalog} from '@/pages/Catalog';

export class FitLayout extends React.PureComponent {

    render() {
        return (
            <>
                <Header />
                <section className={styles.container}>

                </section>
            </>
        );
    }
}

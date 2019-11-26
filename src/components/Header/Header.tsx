import React, {useState, useEffect} from 'react';
import styles from './Header.module.scss';

export function Header(props) {

    return (
        <section className={styles.header}>
            <div className={'logo'}>
                <span className={'logo-wrapper'}>

                    <img src={'/images/logo.png'} />
                </span>
            </div>
        </section>
    );
}
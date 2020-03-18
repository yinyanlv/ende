import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import {Nav} from './nav';
import {useUtils} from '@/hooks';

export function Header(props) {
    const utils = useUtils();

    return (
        <section className={styles.header}>
            <div className="logo-box">
                <Link to={'/'} className={'logo-wrapper'}>
                    <img src={'/images/logo.png'} alt="logo"/>
                </Link>
                <span className="title">
                    {utils.getText('app.a1')}
                </span>
            </div>
            <div className="nav-box">
                <Nav/>
            </div>
        </section>
    );
}

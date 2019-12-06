import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import {Nav} from './nav';

export function Header(props) {

    return (
        <section className={styles.header}>
            <div className="logo-box">
                <Link to={'/'}>
                    <img src={'/images/logo.png'} />
                </Link>
            </div>
            <div className="nav-box">
                <Nav />
            </div>
        </section>
    );
}

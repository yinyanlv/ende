import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import {AdvanceSearch} from '@/pages/common/advance-search';
import {Nav} from './nav';

export function Header(props) {

    return (
        <section className={styles.header}>
            <div className="logo-box">
                <Link to={'/'}>
                    <img src={'/images/logo.png'} alt="logo"/>
                </Link>
                <span className="title">
                    EPC售后信息发布平台
                </span>
            </div>
            <div className="nav-box">
                <Nav/>
            </div>
            <AdvanceSearch isShow={true}/>
        </section>
    );
}

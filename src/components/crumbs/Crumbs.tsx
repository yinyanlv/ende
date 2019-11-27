import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Icon} from 'antd';
import styles from './Crumbs.module.scss';

export function Crumbs(props) {
    return (
        <div className={styles.crumbs}>
            <Breadcrumb separator={<Icon type="double-right" />}>
                <Breadcrumb.Item href="/">
                    <span className="crumbs-text">品牌：五菱</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/">
                    <span className="crumbs-text">年份：全部年份</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span className="crumbs-text">车型：全部车型</span>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}

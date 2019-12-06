import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Icon} from 'antd';
import {Search} from '@/pages/common/search';
import styles from './Crumbs.module.scss';

const CrumbItem = Breadcrumb.Item;

export function Crumbs(props) {

    return (
        <div className={styles.crumbs}>
            <Breadcrumb separator={<Icon type="double-right" />}>
                <CrumbItem>
                    <Link to="/">
                        <span className="crumbs-text">品牌：五菱</span>
                    </Link>
                </CrumbItem>
                <CrumbItem >
                    <Link to="/">
                        <span className="crumbs-text">年份：全部年份</span>
                    </Link>
                </CrumbItem>
                <CrumbItem>
                    <span className="crumbs-text">车型：全部车型</span>
                </CrumbItem>
            </Breadcrumb>
            <Search />
        </div>
    );
}

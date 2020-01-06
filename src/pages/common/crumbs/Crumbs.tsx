import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Breadcrumb, Icon} from 'antd';
import {Search} from '@/pages/common/search';
import styles from './Crumbs.module.scss';

const CrumbItem = Breadcrumb.Item;

export function Crumbs(props) {
    const {list} = useSelector((state: any) => {
        return state.crumbs;
    });

    return (
        <div className={styles.crumbs}>
            <Breadcrumb>
                {
                    list && list.map((item, index) => {
                        return (
                            <CrumbItem key={item.code}>
                                {
                                    item.url ? (
                                        <Link to={item.url}>
                                            <span className="crumbs-text">{item.label ? (item.label + ' : ') : ''}{item.name}</span>
                                        </Link>
                                    ) : (
                                        <span className="crumbs-text">{item.label ? (item.label + ' : ') : ''}{item.name}</span>
                                    )
                                }
                            </CrumbItem>
                        );
                    })
                }
            </Breadcrumb>
            <Search />
        </div>
    );
}

import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Breadcrumb} from 'antd';
import {HomeOutlined, StarOutlined} from '@ant-design/icons';
import {VinSearch} from '@/pages/common/vin-search';
import styles from './Crumbs.module.scss';

const CrumbItem = Breadcrumb.Item;

export function Crumbs(props) {
    const {list, isShowCollect} = useSelector((state: any) => {
        return state.crumbs;
    });
    const {productCatalogUrl} = useSelector((state: any) => {
        return state.config;
    });

    return (
        <div className={styles.crumbs}>
            <div className="left-box">
                <Breadcrumb>
                    <CrumbItem key="home">
                        <a href={productCatalogUrl}>
                            <HomeOutlined />
                            <span className="crumbs-text">产品大全</span>
                        </a>
                    </CrumbItem>
                    <CrumbItem key="home">
                        <Link to="/">
                            <span className="crumbs-text">EPC</span>
                        </Link>
                    </CrumbItem>
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
                {
                    isShowCollect && <div className="operator-wrapper"><StarOutlined/></div>
                }
            </div>
            <VinSearch />
        </div>
    );
}

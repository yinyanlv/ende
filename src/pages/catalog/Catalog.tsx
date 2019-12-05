import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {Tabs, Icon} from 'antd';
import {Loading} from '@/components/loading';
import styles from './Catalog.module.scss';
import {loadBrandsCreator, loadConditionsCreator} from './actions';

const TabPane = Tabs.TabPane;

export function PageCatalog(props) {

    const dispatch = useDispatch();
    const {
        brands,
        isBrandsLoading,
        conditions,
        isConditionsLoading
    } = useSelector((state: any) => {
        return state.catalog;
    });
    const [years, models] = conditions;

    useEffect(() => {
        dispatch(loadBrandsCreator.request());
        dispatch(loadConditionsCreator.beforeRequest());
    }, []);

    function loadConditions(code) {
        dispatch(loadConditionsCreator.request(code));
    }

    return (
        <>
            <div className={styles.container}>
                <div className="panel panel-brand">
                    <Loading isLoading={isBrandsLoading}>
                        <Tabs>
                            {
                                brands.map((brand) => {
                                    return (
                                        <TabPane tab={brand.name} key={brand.code}>
                                            <div className="content">
                                                <ul className="car-list">
                                                    {
                                                        brand.list.map((item) => {
                                                            return (
                                                                <li className="item" key={item.code}
                                                                    onClick={loadConditions.bind(null, item.code)}>
                                                                    <span className="image-wrapper">
                                                                        <img src={item.src}/>
                                                                    </span>
                                                                    <span className="text">{item.name}</span>
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                    </Loading>
                </div>
                <div className="panel panel-year">
                    <Loading isLoading={isConditionsLoading}>
                        <>
                            {
                                years && (
                                    <>
                                        <div className="panel-header">
                                            <div><Icon type="unordered-list"/> {years.name}</div>
                                        </div>
                                        <div className="panel-content">
                                            <ul className="text-list">
                                                {
                                                    years.list && years.list.map((item) => {
                                                        return (
                                                            <li className="item" key={item.code}>
                                                                <span className="icon-wrapper"><i
                                                                         className="dot"/></span>
                                                                <span className="text">{item.name}</span>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    </Loading>
                </div>
                <div className="panel panel-model">
                    <Loading isLoading={isConditionsLoading}>
                        <>
                            {
                                models && (
                                    <>
                                        <div className="panel-header">
                                            <div><Icon type="unordered-list"/> {models.name}</div>
                                        </div>
                                        <div className="panel-content">
                                            <ul className="text-list">
                                                {
                                                    models.list && models.list.map((item) => {
                                                        return (
                                                            <li className="item" key={item.code}>
                                                                <Link to={'/usage'}>
                                                                <span className="icon-wrapper"><i
                                                                    className="dot"/></span>
                                                                    <span className="text">{item.name}</span>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    </Loading>
                </div>
            </div>
        </>
    );
}

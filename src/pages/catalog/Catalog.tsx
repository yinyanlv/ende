import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import cls from 'classnames';
import {Tabs} from 'antd';
import {Panel} from '@/components/panel';
import styles from './Catalog.module.scss';
import {loadBrandsCreator, loadConditionsCreator} from './actions';

const TabPane = Tabs.TabPane;

export function PageCatalog(props) {

    const dispatch = useDispatch();
    const {
        brands,
        isBrandsLoading,
        activeBrandCode,
        conditions,
        isConditionsLoading
    } = useSelector((state: any) => {
        return state.catalog;
    });
    const {
        resHost
    } = useSelector((state: any) => {
        return state.auth;
    });

    const [years, models] = conditions;

    useEffect(() => {
        dispatch(loadBrandsCreator.request());
        dispatch(loadConditionsCreator.beforeRequest());
    }, []);

    function loadConditions(params) {
        dispatch(loadBrandsCreator.setActive(params.m_2));
        dispatch(loadConditionsCreator.request(params));
    }

    return (
        <>
            <div className={styles.container}>

                <Panel isLoading={isBrandsLoading} mode={'empty'} className={'panel-brand'}>
                    <Tabs>
                        {
                            brands && brands.map((brand) => {
                                return (
                                    <TabPane tab={brand.name} key={brand.code}>
                                        <div className="content">
                                            <ul className="car-list">
                                                {
                                                    brand.list.map((item) => {
                                                        return (
                                                            <li className={
                                                                cls('item', {
                                                                    'active': item.active
                                                                })
                                                            }
                                                                key={item.code}
                                                                onClick={loadConditions.bind(null, {
                                                                    m_2: item.code
                                                                })}
                                                            >
                                                                <span className="image-wrapper">
                                                                    <img src={resHost + item.src}/>
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
                </Panel>
                <Panel isLoading={isConditionsLoading} title={years && years.name} className="panel-year">
                    <ul className="text-list">
                        {
                            years && years.list && years.list.map((item) => {
                                return (
                                    <li className="item"
                                        key={item.code}
                                        onClick={loadConditions.bind(null, {
                                            m_2: activeBrandCode,
                                            m_3: item.code
                                        })}
                                    >
                                        <div className="text-wrapper">
                                            <span className="icon-wrapper"><i className="dot"/></span>
                                            <span className="text">{item.name}</span>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Panel>
                <Panel isLoading={isConditionsLoading} title={models && models.name} className="panel-model">
                    <ul className="text-list">
                        {
                            models && models.list && models.list.map((item) => {
                                return (
                                    <li className="item" key={item.code}>
                                        <div className="text-wrapper">
                                            <Link to={'/usage'}>
                                                <span className="icon-wrapper"><i className="dot"/></span>
                                                <span className="text">{item.name}</span>
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Panel>
            </div>
        </>
    );
}

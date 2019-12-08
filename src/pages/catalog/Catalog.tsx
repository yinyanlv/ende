import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import cls from 'classnames';
import {Tabs} from 'antd';
import {Panel} from '@/components/panel';
import styles from './Catalog.module.scss';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {loadBrandsCreator, loadConditionsCreator} from './actions';

const TabPane = Tabs.TabPane;

export function PageCatalog(props) {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const {
        brands,
        isBrandsLoading,
        conditions,
        isConditionsLoading,
        activeBrandCode,
        activeYearCode
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
        const queryObj = queryString.parse(location.search);
        console.log(queryObj);
        dispatch(loadBrandsCreator.request());
        dispatch(loadConditionsCreator.beforeRequest());
    }, [dispatch]);

    function loadConditions(params) {
        dispatch(loadBrandsCreator.setActive(params.m_2));
        if (params.m_3) {
            dispatch(crumbsCreator.request({
                m_2: activeBrandCode,
                m_3: params.m_3
            }));
            dispatch(loadConditionsCreator.setActive(params.m_3));
        } else {
            dispatch(crumbsCreator.request({
                m_2: activeBrandCode
            }));
        }
        dispatch(loadConditionsCreator.request(params));
        history.push(Object.assign(location, {
            search: '?m_1=sgmw'
        }));
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
                                                                    'active': item.code === activeBrandCode
                                                                })
                                                            }
                                                                key={item.code}
                                                                onClick={loadConditions.bind(null, {
                                                                    m_2: item.code
                                                                })}
                                                            >
                                                                <span className="image-wrapper">
                                                                    <img src={resHost + item.src} alt={item.name}/>
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
                                    <li className={
                                            cls('item', {
                                                'active': item.code === activeYearCode
                                            })
                                        }
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

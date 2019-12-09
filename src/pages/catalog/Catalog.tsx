import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import cls from 'classnames';
import {Tabs} from 'antd';
import {updateLocationSearch} from '@/common/utils';
import {Panel} from '@/components/panel';
import styles from './Catalog.module.scss';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {catalogCreator, brandsCreator, conditionsCreator} from './actions';

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
        activeM1Code,
        activeM2Code,
        activeM3Code,
        activeM4Code
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

        if (location.search) {
            const queryObj = queryString.parse(location.search);
            dispatch(catalogCreator.setActiveCodes(queryObj));
            dispatch(crumbsCreator.request(queryObj));
            dispatch(brandsCreator.request(queryObj));
            dispatch(conditionsCreator.beforeRequest());
        } else {
            dispatch(brandsCreator.request());
            dispatch(conditionsCreator.beforeRequest());
        }
    }, [dispatch]);

    function handleTabsChange(m1Code) {
        const params = {
            m_1: m1Code
        };
        dispatch(catalogCreator.setActiveCodes(params));
        dispatch(crumbsCreator.request(params));
        updateLocationSearch(params);
    }

    function handleClickM2(m2Code) {
        const params = {
            m_1: activeM1Code,
            m_2: m2Code
        };
        dispatch(catalogCreator.setActiveCodes(params));
        dispatch(crumbsCreator.request(params));
        dispatch(conditionsCreator.request(params));
        updateLocationSearch(params);
    }

    function handleClickM3(m3Code) {
        const params = {
            m_1: activeM1Code,
            m_2: activeM2Code,
            m_3: m3Code
        };
        dispatch(catalogCreator.setActiveCodes(params));
        dispatch(crumbsCreator.request(params));
        dispatch(conditionsCreator.request(params));
        updateLocationSearch(params);
    }

    function handleClickM4(m4Code) {
        const params = {
            m_1: activeM1Code,
            m_2: activeM2Code,
            m_3: activeM3Code,
            m_4: m4Code
        };
        dispatch(catalogCreator.setActiveCodes(params));
        dispatch(crumbsCreator.request(params));
        dispatch(conditionsCreator.request(params));
        updateLocationSearch(params);
        history.push({
            pathname: '/usage',
            search: queryString.stringify(params)
        });
    }

    return (
        <>
            <div className={styles.container}>
                <Panel isLoading={isBrandsLoading} mode={'empty'} className={'panel-brand'}>
                    <Tabs defaultActiveKey={activeM1Code} onChange={handleTabsChange}>
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
                                                                    'active': item.code === activeM2Code
                                                                })
                                                            }
                                                                key={item.code}
                                                                onClick={handleClickM2.bind(null, item.code)}
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
                                                'active': item.code === activeM3Code
                                            })
                                        }
                                        key={item.code}
                                        onClick={handleClickM3.bind(null, item.code)}
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
                                    <li className={
                                        cls('item', {
                                            'active': item.code === activeM4Code
                                        })
                                    }
                                        key={item.code}
                                        onClick={handleClickM4.bind(null, item.code)}
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
            </div>
        </>
    );
}

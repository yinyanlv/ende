import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {Tabs, Icon} from 'antd';
import {Loading} from '@/components/loading';
import styles from './Catalog.module.scss';
import {loadBrandsActionCreator} from './actions';

const TabPane = Tabs.TabPane;

export function PageCatalog(props) {

    const dispatch = useDispatch();
    const {
        brands,
        isBrandsLoading,
        years,
        isYearsLoading,
        models,
        isModelsLoading
    } = useSelector((state: any) => {
        return state.catalog;
    });

    useEffect(() => {
        dispatch(loadBrandsActionCreator.request());
    }, []);

    function loadYears(code) {
        console.log(code);
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
                                                        brand.list.map((car) => {
                                                            return (
                                                                <li className="item" key={car.code} onClick={loadYears.bind(null, car.code)}>
                                                                    <span className="image-wrapper">
                                                                        <img src={car.src}/>
                                                                    </span>
                                                                    <span className="text">{car.name}</span>
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
                    <div className="panel-header">
                        <div><Icon type="unordered-list"/> 年份</div>
                    </div>
                    <div className="panel-content">
                        <ul className="text-list">
                            <li className="item active"><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">全部年份</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">2019</span></li>
                        </ul>
                    </div>
                </div>
                <div className="panel panel-model">
                    <div className="panel-header">
                        <div><Icon type="unordered-list"/> 车型</div>
                    </div>
                    <div className="panel-content">
                        <ul className="text-list">
                            <li className="item active"><Link to={'/usage'}><span className="icon-wrapper"><i
                                className="dot"/></span><span className="text">全部车型</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                            <li className="item"><Link to={'/usage'}><span className="icon-wrapper"><i className="dot"/></span><span
                                className="text">DC - 舒适型(LV1)</span></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

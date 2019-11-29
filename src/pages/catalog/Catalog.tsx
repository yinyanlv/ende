import React from 'react';
import {Tabs, Spin, Icon} from 'antd';
import styles from './Catalog.module.scss';

export function PageCatalog(props) {

    return (
        <>
            <div className={styles.container}>
                <div className="panel panel-brand">
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="五菱" key="1">
                            <Spin spinning={false}>
                                <div className="content">
                                    <ul className="car-list">
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN150M.gif'}/></span>
                                            <span className="text">CN150M - 五菱宏光PLUS</span>
                                        </li>
                                    </ul>
                                </div>
                            </Spin>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="宝骏" key="2">
                            <Spin spinning={false}>
                                <div className="content">
                                    <ul className="car-list">
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                        <li className="item">
                                            <span className="image-wrapper"><img src={'/images/CN113.gif'}/></span>
                                            <span className="text">CN113 - 五菱宏光S1</span>
                                        </li>
                                    </ul>
                                </div>
                            </Spin>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className="panel panel-year">
                    <div className="panel-header">
                        <div>年份</div>
                    </div>
                    <div className="panel-content">
                        <ul className="text-list">
                            <li className="item active"><span className="icon-wrapper"><i className="dot" /></span><span className="text">全部年份</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot" /></span><span className="text">全部年份</span></li>
                        </ul>
                    </div>
                </div>
                <div className="panel panel-model">
                    <div className="panel-header">
                        <div>车型</div>
                    </div>
                    <div className="panel-content">
                        <ul className="text-list">
                            <li className="item active"><span className="icon-wrapper"><i className="dot" /></span><span className="text">全部车型</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot" /></span><span className="text">DC - 舒适型(LV1)</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot" /></span><span className="text">DC - 舒适型(LV1)</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot" /></span><span className="text">DC - 舒适型(LV1)</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot" /></span><span className="text">DC - 舒适型(LV1)</span></li>
                            <li className="item"><span className="icon-wrapper"><i className="dot" /></span><span className="text">DC - 舒适型(LV1)</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

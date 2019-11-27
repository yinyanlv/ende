import React, {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import styles from './Header.module.scss';


export function Header(props) {

    return (
        <section className={styles.header}>
            <div className="logo-box">
                <Link to={'/'}>
                    <img src={'/images/logo.png'} />
                </Link>
            </div>
            <div className="nav-box">
                <Menu mode="horizontal">
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="appstore" />
                            产品大全
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="user" />
                            系统管理员
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="star" />
                            书签
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="global" />
                            语言
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="shopping-cart" />
                            购物车
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="file-text" />
                            订单
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="bell" />
                            消息
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="video-camera" />
                            指导视频
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to={'/'}>
                            <Icon type="question-circle" />
                            帮助
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </div>
        </section>
    );
}

import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Menu, Icon, Dropdown, Badge} from 'antd';
import styles from './nav.module.scss';

const SubMenu = Menu.SubMenu;

export function Nav(props) {

    const userMenu = (
        <Menu>
            <Menu.Item>退出登录</Menu.Item>
        </Menu>
    );

    const bookmarkMenu = (
        <Menu>
            <Menu.Item>书签管理</Menu.Item>
            <Menu.Item>历史管理</Menu.Item>
        </Menu>
    );

    const langMenu = (
        <Menu>
            <Menu.Item>中文</Menu.Item>
            <Menu.Item>English</Menu.Item>
        </Menu>
    );

    const helpMenu = (
        <Menu>
            <Menu.Item>用户手册</Menu.Item>
            <Menu.Item>EPC查询指导手册</Menu.Item>
            <Menu.Item>联系客服</Menu.Item>
            <Menu.Item>服务协议</Menu.Item>
            <Menu.Item>关于事成</Menu.Item>
            <Menu.Item>反馈建议</Menu.Item>
        </Menu>
    );


    return (
        <nav className={styles.nav}>
            <NavLink to={'/'} className="nav-item">
                   <span className={'nav-item-inner'}>
                        <Icon type="appstore"/>
                            产品大全
                    </span>
            </NavLink>
            <Dropdown overlay={userMenu}>
                <NavLink to={'/'} className="nav-item">
                    <Badge count={102} overflowCount={10} showZero={false}>
                       <span className={'nav-item-inner'}>
                            <Icon type="user"/>
                            系统管理员
                        </span>
                    </Badge>
                </NavLink>
            </Dropdown>
            <Dropdown overlay={bookmarkMenu}>
                <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                        <Icon type="star"/>
                        书签
                        </span>
                </NavLink>
            </Dropdown>
            <Dropdown overlay={langMenu}>
                <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                      <Icon type="global"/>
                        语言
                        </span>
                </NavLink>
            </Dropdown>

            <Dropdown overlay={userMenu}>
                <NavLink to={'/'} className="nav-item">
                    <Badge count={102} overflowCount={10} showZero={false}>
                       <span className={'nav-item-inner'}>
                              <Icon type="shopping-cart"/>
                        购物车
                        </span>
                    </Badge>
                </NavLink>
            </Dropdown>

            <NavLink to={'/'} className="nav-item">
                   <span className={'nav-item-inner'}>
                            <Icon type="file-text"/>
                        订单
                    </span>
            </NavLink>

            <Dropdown overlay={userMenu}>
                <NavLink to={'/'} className="nav-item">
                    <Badge count={102} overflowCount={10} showZero={false}>
                       <span className={'nav-item-inner'}>
                        <Icon type="bell"/>
                        消息
                        </span>
                    </Badge>
                </NavLink>
            </Dropdown>
            <NavLink to={'/'} className="nav-item">
                   <span className={'nav-item-inner'}>
                       <Icon type="video-camera"/>
                        指导视频
                    </span>
            </NavLink>
            <Dropdown overlay={helpMenu}>
                <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                         <Icon type="question-circle"/>
                            帮助
                        </span>
                </NavLink>
            </Dropdown>
        </nav>
    );
}

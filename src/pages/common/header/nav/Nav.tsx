import React from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Menu, Icon, Dropdown, Badge, Popover, Tabs} from 'antd';
import {configCreator} from '@/store/config/actions';
import styles from './nav.module.scss';

const TabPane = Tabs.TabPane;
const MenuItem = Menu.Item;

export function Nav(props) {
    const dispatch = useDispatch();

    const userMenu = (
        <Menu>
            <MenuItem>退出登录</MenuItem>
        </Menu>
    );

    const bookmarkMenu = (
        <Menu>
            <MenuItem>书签管理</MenuItem>
            <MenuItem>历史管理</MenuItem>
        </Menu>
    );

    const langMenu = (
        <Menu>
            <MenuItem onClick={changeLang.bind(null, 'zh-CN')}>中文</MenuItem>
            <MenuItem onClick={changeLang.bind(null, 'en-US')}>English</MenuItem>
        </Menu>
    );

    const helpMenu = (
        <Menu>
            <MenuItem>用户手册</MenuItem>
            <MenuItem>EPC查询指导手册</MenuItem>
            <MenuItem>联系客服</MenuItem>
            <MenuItem>服务协议</MenuItem>
            <MenuItem>关于事成</MenuItem>
            <MenuItem>反馈建议</MenuItem>
        </Menu>
    );

    const cart = (
        <div style={{width: 300}}>
            购物车
        </div>
    );

    const message = (
        <Tabs defaultActiveKey="1" onChange={() => {
        }} style={{width: 300}}>
            <TabPane tab="通知" key="1">
                通知
            </TabPane>
            <TabPane tab="通讯" key="2">
                通讯
            </TabPane>
        </Tabs>
    );

    function changeLang(lang) {
        dispatch(configCreator.setConfig({
            lang
        }));
    }

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
                   <span className={'nav-item-inner'}>
                        <Icon type="user"/>
                        系统管理员
                    </span>
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
            <Popover content={cart}>
                <NavLink to={'/'} className="nav-item">
                    <Badge count={102} overflowCount={10} showZero={false} offset={[-15, -10]}>
                       <span className={'nav-item-inner'}>
                              <Icon type="shopping-cart"/>
                        购物车
                        </span>
                    </Badge>
                </NavLink>
            </Popover>
            <NavLink to={'/'} className="nav-item">
                   <span className={'nav-item-inner'}>
                            <Icon type="file-text"/>
                        订单
                    </span>
            </NavLink>
            <Popover content={message}>
                <NavLink to={'/'} className="nav-item">
                    <Badge count={2} overflowCount={10} showZero={false} offset={[-15, -10]}>
                       <span className={'nav-item-inner'}>
                        <Icon type="bell"/>
                        消息
                        </span>
                    </Badge>
                </NavLink>
            </Popover>
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

import React from 'react';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Menu, Icon, Dropdown, Badge, Popover, Tabs, Drawer} from 'antd';
import {configCreator} from '@/store/config/actions';
import {searchCreator} from '@/pages/common/search/actions';
import styles from './nav.module.scss';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';

const TabPane = Tabs.TabPane;
const MenuItem = Menu.Item;

export function Nav(props) {
    const dispatch = useDispatch();

    const userMenu = (
        <Menu>
            <MenuItem>退出登录</MenuItem>
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

    const moreMenu = (
        <Menu>
            <MenuItem>书签</MenuItem>
            <MenuItem>历史</MenuItem>
        </Menu>
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

    function handleClickSearch() {
        dispatch(searchCreator.setIsShowSearch({
            isShow: true
        }));
    }

    function handleClickShoppingCart() {
        dispatch(shoppingCartCreator.setIsShowShoppingCart({
            isShow: true
        }));
    }

    return (
        <>
            <nav className={styles.nav}>
                <div className="common-nav">
                    <NavLink to={'/'} className="nav-item">
                        <span className={'nav-item-inner'}>
                            <Icon type="home"/>
                        </span>
                    </NavLink>
                    <Popover content={message}>
                        <NavLink to={'/'} className="nav-item">
                            <Badge count={2} overflowCount={10} showZero={false} offset={[-5, -2]}>
                       <span className={'nav-item-inner'}>
                        <Icon type="message"/>
                        </span>
                            </Badge>
                        </NavLink>
                    </Popover>
                    <Dropdown overlay={langMenu}>
                        <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                       <Icon type="global"/>
                        </span>
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={userMenu}>
                        <NavLink to={'/'} className="nav-item">
                   <span className={'nav-item-inner item-user'}>
                        <Icon type="user"/>
                        系统管理员
                    </span>
                        </NavLink>
                    </Dropdown>
                    <Dropdown overlay={helpMenu}>
                        <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                         <Icon type="question-circle"/>
                        </span>
                        </NavLink>
                    </Dropdown>
                </div>
                <div>
                    <span className="nav-item">
                       <span className={'nav-item-inner'} onClick={handleClickSearch}>
                            <Icon type="search"/>
                        </span>
                    </span>
                    <span className="nav-item">
                       <span className={'nav-item-inner'}>
                            <Icon type="star"/>
                        </span>
                    </span>
                    <span className="nav-item">
                       <span className={'nav-item-inner'} onClick={handleClickShoppingCart}>
                            <Icon type="shopping-cart"/> <span>(<span>11</span>)</span>
                        </span>
                    </span>
                    <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                            <Icon type="file-text"/>
                        </span>
                    </NavLink>
                    <Dropdown overlay={moreMenu}>
                    <span className="nav-item">
                          <span className={'nav-item-inner'}>
                            <Icon type="more"/>
                        </span>
                    </span>
                    </Dropdown>
                </div>
            </nav>
        </>
    );
}

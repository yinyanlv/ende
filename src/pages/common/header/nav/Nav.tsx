import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown, Badge, Popover, Tabs} from 'antd';
import {
    SearchOutlined,
    GlobalOutlined,
    ShoppingCartOutlined,
    FileTextOutlined,
    StarOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
    MessageOutlined,
    UserOutlined
} from '@ant-design/icons';
import {buildQueryParams} from '@/common/utils';
import {configCreator} from '@/store/config/actions';
import {searchCreator} from '@/pages/common/search/actions';
import {navCreator} from './actions';
import styles from './nav.module.scss';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {collectCreator} from '@/pages/common/collect/actions';

const TabPane = Tabs.TabPane;
const MenuItem = Menu.Item;

export function Nav(props) {
    const dispatch = useDispatch();
    const {cartCount} = useSelector((state: any) => {
        return state.nav;
    });

    useEffect(() => {
        dispatch(navCreator.loadCartCount());
    }, []);

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
        const params = buildQueryParams();
        dispatch(shoppingCartCreator.setIsShowShoppingCart({
            isShow: true
        }));
        dispatch(shoppingCartCreator.doQuery(params));
    }

    function handleClickCollect() {
        const params = buildQueryParams();
        dispatch(collectCreator.setIsShowCollect({
            isShow: true
        }));
        dispatch(collectCreator.doQuery(params));
    }

    return (
        <>
            <nav className={styles.nav}>
                <div className="common-nav">
                    <span className="nav-item">
                       <span className={'nav-item-inner'} onClick={handleClickSearch}>
                           <SearchOutlined/>
                        </span>
                    </span>
                    <span className="nav-item">
                       <span className={'nav-item-inner'} onClick={handleClickShoppingCart}>
                            <ShoppingCartOutlined/> <span>(<span>{cartCount}</span>)</span>
                        </span>
                    </span>
                    <NavLink to={'/orders'} className="nav-item">
                       <span className={'nav-item-inner'}>
                           <FileTextOutlined/>
                        </span>
                    </NavLink>
                    <span className="nav-item">
                       <span className={'nav-item-inner'} onClick={handleClickCollect}>
                           <StarOutlined/>
                        </span>
                    </span>
                    <Dropdown overlay={helpMenu}>
                        <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                           <QuestionCircleOutlined/>
                        </span>
                        </NavLink>
                    </Dropdown>
                </div>
                <div>
                    <NavLink to={'/'} className="nav-item">
                        <span className={'nav-item-inner'}>
                            <HomeOutlined/>
                        </span>
                    </NavLink>
                    <Dropdown overlay={userMenu}>
                        <NavLink to={'/'} className="nav-item">
                   <span className={'nav-item-inner item-user'}>
                       <UserOutlined/>
                        系统管理员
                    </span>
                        </NavLink>
                    </Dropdown>
                    <Popover content={message}>
                        <NavLink to={'/'} className="nav-item">
                            <Badge count={2} overflowCount={10} showZero={false} offset={[-5, -2]}>
                       <span className={'nav-item-inner'}>
                           <MessageOutlined/>
                        </span>
                            </Badge>
                        </NavLink>
                    </Popover>
                    <Dropdown overlay={langMenu}>
                        <NavLink to={'/'} className="nav-item">
                       <span className={'nav-item-inner'}>
                           <GlobalOutlined/>
                        </span>
                        </NavLink>
                    </Dropdown>
                </div>
            </nav>
        </>
    );
}

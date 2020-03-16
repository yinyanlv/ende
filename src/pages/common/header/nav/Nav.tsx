import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown} from 'antd';
import {
    SearchOutlined,
    GlobalOutlined,
    ShoppingCartOutlined,
    FileTextOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
    UserOutlined
} from '@ant-design/icons';
import {buildQueryParams} from '@/common/utils';
import {configCreator} from '@/store/config/actions';
import {searchCreator} from '@/pages/common/search/actions';
import {navCreator} from './actions';
import styles from './nav.module.scss';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {storageService} from '@/common/storageService';

const MenuItem = Menu.Item;

export function Nav(props) {
    const dispatch = useDispatch();
    const {cartCount} = useSelector((state: any) => {
        return state.nav;
    });
    const {logoutUrl, user} = useSelector((state: any) => {
        return state.config;
    });

    useEffect(() => {
        dispatch(navCreator.loadCartCount());
    }, []);

    function logout() {
        const storage = storageService.getStorage();
        window.location.href = logoutUrl + '?access_token=' + storage.token;
    }

    const userMenu = (
        <Menu>
            <MenuItem onClick={logout}>退出登录</MenuItem>
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
            <MenuItem><a href={'http://help.tis.servision.com.cn/SGMW/tis/4s/'} target={'_blank'}>用户手册</a></MenuItem>
            <MenuItem><a href={'http://help.tis.servision.com.cn/SGMW/epc/zh/'} target={'_blank'}>EPC查询指导手册</a></MenuItem>
            <MenuItem><a href={'http://home.tis.servision.com.cn/help/contact-service'} target={'_blank'}>联系客服</a></MenuItem>
            <MenuItem><a href={'http://home.tis.servision.com.cn/help/service-agreement'} target={'_blank'}>服务协议</a></MenuItem>
            <MenuItem><a href={'https://www.servision.com.cn'} target={'_blank'}>关于事成</a></MenuItem>
            <MenuItem><a href={'http://wenjuan.servision.com.cn/jq/5012823.aspx'} target={'_blank'}>反馈建议</a></MenuItem>
        </Menu>
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
                           <i className="iconfont icon-order"></i>
                        </span>
                    </NavLink>
                    <Dropdown overlay={helpMenu}>
                       <span className={'nav-item-inner'}>
                           <QuestionCircleOutlined/>
                        </span>
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
                        <span className={'username'}>{user && user.username}</span>
                    </span>
                        </NavLink>
                    </Dropdown>
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

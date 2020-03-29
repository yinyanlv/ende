import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Menu, Dropdown, Tooltip} from 'antd';
import {
    SearchOutlined,
    GlobalOutlined,
    ShoppingCartOutlined,
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
import {useUtils} from '@/hooks';

const MenuItem = Menu.Item;

export function Nav(props) {
    const dispatch = useDispatch();
    const {cartCount} = useSelector((state: any) => {
        return state.nav;
    });
    const {logoutUrl, user} = useSelector((state: any) => {
        return state.config;
    });
    const utils = useUtils();

    useEffect(() => {
        dispatch(navCreator.loadCartCount());
    }, []);

    function logout() {
        const lang = utils.getTisLang();
        const returnUrl = window.location.href;
        storageService.removeStorage();
        window.location.href = `${logoutUrl}?service=${returnUrl}&locale=${lang}`;
    }

    const userMenu = (
        <Menu>
            <MenuItem onClick={logout}>{utils.getText('app.a5')}</MenuItem>
        </Menu>
    );

    const langMenu = (
        <Menu>
            <MenuItem onClick={changeLang.bind(null, 'zh')}>中文</MenuItem>
            <MenuItem onClick={changeLang.bind(null, 'en')}>English</MenuItem>
        </Menu>
    );

    const helpMenu = (
        <Menu>
            <MenuItem><a href={'http://help.tis.servision.com.cn/SGMW/tis/4s/'} target={'_blank'}>{utils.getText('app.a6')}</a></MenuItem>
            <MenuItem><a href={'http://help.tis.servision.com.cn/SGMW/epc/zh/'}
                         target={'_blank'}>{utils.getText('app.a7')}</a></MenuItem>
            <MenuItem><a href={'http://home.tis.servision.com.cn/help/contact-service'}
                         target={'_blank'}>{utils.getText('app.a8')}</a></MenuItem>
            <MenuItem><a href={'http://home.tis.servision.com.cn/help/service-agreement'}
                         target={'_blank'}>{utils.getText('app.a9')}</a></MenuItem>
            <MenuItem><a href={'https://www.servision.com.cn'} target={'_blank'}>{utils.getText('app.a10')}</a></MenuItem>
            <MenuItem><a href={'http://wenjuan.servision.com.cn/jq/5012823.aspx'} target={'_blank'}>{utils.getText('app.a11')}</a></MenuItem>
        </Menu>
    );

    function changeLang(lang) {
        const storage = storageService.getStorage();
        storageService.setStorage({
            token: storage.token,
            lang: lang
        });
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
                        <Tooltip title={utils.getText('search.a1')}>
                       <span className={'nav-item-inner'} onClick={handleClickSearch}>
                           <SearchOutlined/>
                        </span>
                        </Tooltip>
                    </span>
                    <span className="nav-item">
                        <Tooltip title={utils.getText('cart.a1')}>
                       <span className={'nav-item-inner'} onClick={handleClickShoppingCart}>
                            <ShoppingCartOutlined/> <span>(<span>{cartCount}</span>)</span>
                        </span>
                        </Tooltip>
                    </span>
                    <NavLink to={'/orders'} className="nav-item">
                        <Tooltip title={utils.getText('order.a1')}>
                       <span className={'nav-item-inner'}>
                           <i className="iconfont icon-order"></i>
                        </span>
                        </Tooltip>
                    </NavLink>
                    <Dropdown overlay={helpMenu}>
                       <span className={'nav-item-inner'}>
                           <QuestionCircleOutlined/>
                        </span>
                    </Dropdown>
                </div>
                <div>
                    <NavLink to={'/'} className="nav-item">
                        <Tooltip title={utils.getText('app.a4')}>
                        <span className={'nav-item-inner'}>
                            <HomeOutlined/>
                        </span>
                        </Tooltip>
                    </NavLink>
                    <Dropdown overlay={userMenu}>
                   <span className={'nav-item-inner item-user'}>
                       <UserOutlined/>
                        <span className={'username'}>{user && user.username}</span>
                    </span>
                    </Dropdown>
                    <Dropdown overlay={langMenu}>
                       <span className={'nav-item-inner'}>
                           <GlobalOutlined/>
                        </span>
                    </Dropdown>
                </div>
            </nav>
        </>
    );
}

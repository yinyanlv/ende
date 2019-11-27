import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Menu, Icon} from 'antd';

export function Nav(props) {

    return (
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
    );
}

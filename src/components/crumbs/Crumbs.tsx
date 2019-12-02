import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Icon, Input, Select, Menu, Dropdown, Button} from 'antd';
import styles from './Crumbs.module.scss';

const Search = Input.Search;
const Option = Select.Option;

export function Crumbs(props) {

    const menu = (
        <Menu>
            <Menu.Item>
                <span>VSN查询</span>
            </Menu.Item>
            <Menu.Item>
                <span>VIN查询</span>
            </Menu.Item>
            <Menu.Item>
                <span>零件查询</span>
            </Menu.Item>
            <Menu.Item>
                <span>图例编号查询</span>
            </Menu.Item>
            <Menu.Item>
                <span>高级查询</span>
            </Menu.Item>
            <Menu.Item>
                <span>替换查询</span>
            </Menu.Item>
            <Menu.Item>
                <span>信息检索</span>
            </Menu.Item>
            <Menu.Item>
                <span>用户备注查询</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.crumbs}>
            <Breadcrumb separator={<Icon type="double-right" />}>
                <Breadcrumb.Item>
                    <Link to="/">
                        <span className="crumbs-text">品牌：五菱</span>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    <Link to="/usage">
                        <span className="crumbs-text">年份：全部年份</span>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span className="crumbs-text">车型：全部车型</span>
                </Breadcrumb.Item>
            </Breadcrumb>

            <div className="operator-box">
                <div className="item item-star">
                    <Icon type="star" />
                </div>
                <div className="item item-search">
                    <Search placeholder="请输入VIN码,VSN码,零件编号或零件描述" onSearch={()=>{}} enterButton />
                </div>
                <div className="item">
                    <Dropdown overlay={menu} >
                        <Button type="primary"><Icon type="search" />更多查询<Icon type="down"/> </Button>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

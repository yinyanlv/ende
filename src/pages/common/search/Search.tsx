import React from 'react';
import {Button, Dropdown, Icon, Input, Menu} from 'antd';
import styles from './Search.module.scss';

const MenuItem = Menu.Item;
const AntdSearch = Input.Search;

interface SearchProps {
}

export function Search(props: SearchProps) {

    const menu = (
        <Menu>
            <MenuItem>
                <span>VSN查询</span>
            </MenuItem>
            <MenuItem>
                <span>VIN查询</span>
            </MenuItem>
            <MenuItem>
                <span>零件查询</span>
            </MenuItem>
            <MenuItem>
                <span>图例编号查询</span>
            </MenuItem>
            <MenuItem>
                <span>高级查询</span>
            </MenuItem>
            <MenuItem>
                <span>替换查询</span>
            </MenuItem>
            <MenuItem>
                <span>信息检索</span>
            </MenuItem>
            <MenuItem>
                <span>用户备注查询</span>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={styles.operatorBox}>
            <div className="item">
                <Icon type="star" /><span className="text">收藏</span>
            </div>
            <div className="item">
                <Icon type="shopping-cart" /><span className="text">购物车(<span className="number">10</span>)</span>
            </div>
            <div className="item">
                <Icon type="file-text" /><span className="text">订单</span>
            </div>
            <div className="item item-search">
                <AntdSearch placeholder="请输入VIN码,VSN码,零件编号或零件描述" onSearch={()=>{}} />
            </div>
            <div className="item">
                <Dropdown overlay={menu} >
                    <Button type="primary">更多查询</Button>
                </Dropdown>
            </div>
        </div>
    );
}

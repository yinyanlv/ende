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
            <div className="item item-star">
                <Icon type="star" />
            </div>
            <div className="item item-search">
                <AntdSearch placeholder="请输入VIN码,VSN码,零件编号或零件描述" onSearch={()=>{}} enterButton />
            </div>
            <div className="item">
                <Dropdown overlay={menu} >
                    <Button type="primary"><Icon type="search" />更多查询<Icon type="down"/> </Button>
                </Dropdown>
            </div>
        </div>
    );
}

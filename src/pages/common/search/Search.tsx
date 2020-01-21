import React from 'react';
import { Drawer, Tabs, Table, Form, Button, Row, Col, Input, Cascader, Pagination} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.scss';
import { searchCreator } from './actions';
import {AdvanceSearch} from './advance-search'
import {Replace} from './replace'

const TabPane = Tabs.TabPane;

export function Search(props) {
    const dispatch = useDispatch();
    const search = useSelector((state: any) => {
        return state.search;
    });

    function handleClose() {
        dispatch(searchCreator.setIsShowSearch({
            isShow: false
        }));
    }

    return (
        <Drawer
            closable={false}
            onClose={handleClose}
            visible={search.isShow}
            width="900px"
            className={styles.search}
        >
            <Tabs
                defaultActiveKey="1">
                <TabPane tab="高级查询" key="1">
                    <AdvanceSearch />
                </TabPane>
                <TabPane tab="替换关系" key="2">
                    <Replace />
                </TabPane>
            </Tabs>
        </Drawer>
    );
}

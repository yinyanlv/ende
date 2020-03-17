import React from 'react';
import { Drawer, Tabs} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.scss';
import { searchCreator } from './actions';
import {AdvanceSearch} from './advance-search';
import {Replace} from './replace';

const TabPane = Tabs.TabPane;

export function Search(props) {
    const dispatch = useDispatch();
    const {isShow, activeTab, zIndex} = useSelector((state: any) => {
        return state.search.self;
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
            visible={isShow}
            width={900}
            zIndex={zIndex}
        >
            <div className={styles.search}>
                <Tabs defaultActiveKey={activeTab} type={'card'}>
                    <TabPane tab="高级查询" key="advance-search">
                        <AdvanceSearch />
                    </TabPane>
                    <TabPane tab="替换关系" key="replace">
                        <Replace />
                    </TabPane>
                </Tabs>
            </div>
        </Drawer>
    );
}

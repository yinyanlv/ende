import React from 'react';
import { Drawer, Tabs} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.scss';
import { searchCreator } from './actions';
import {AdvanceSearch} from './advance-search';
import {Replace} from './replace';
import {useUtils} from '@/hooks';
import {applicabilityCreator} from './advance-search/applicability/actions';

const TabPane = Tabs.TabPane;

export function Search(props) {
    const dispatch = useDispatch();
    const utils = useUtils();
    const {isShow, activeTab, zIndex} = useSelector((state: any) => {
        return state.search.self;
    });

    function handleClose() {
        dispatch(searchCreator.setIsShowSearch({
            isShow: false
        }));
        dispatch(applicabilityCreator.setSelectedKeys([]));
    }

    function handleTabChange(activeKey) {
        dispatch(searchCreator.setActiveTab({
            activeTab: activeKey
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
                <Tabs defaultActiveKey={activeTab} onChange={handleTabChange} activeKey={activeTab} type={'card'}>
                    <TabPane tab={utils.getText('search.a1')} key="advance-search">
                        <AdvanceSearch />
                    </TabPane>
                    <TabPane tab={utils.getText('replace.a1')} key="replace">
                        <Replace />
                    </TabPane>
                </Tabs>
            </div>
        </Drawer>
    );
}

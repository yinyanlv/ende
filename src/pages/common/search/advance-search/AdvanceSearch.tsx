import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Tabs} from 'antd';
import styles from './AdvanceSearch.module.scss';
import {Query} from './query';
import {Applicability} from './applicability';
import {Parts} from './parts';
import {Legends} from './legends';
import {useUtils} from '@/hooks';
import {advanceSearchCreator} from './actions';

const TabPane = Tabs.TabPane;

export function AdvanceSearch(props: any) {
    const dispatch = useDispatch();
    const {
        count,
        activeTab
    } = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });
    const utils = useUtils();

    function handleTabChange(activeKey) {
        dispatch(advanceSearchCreator.setActiveTab({
            activeTab: activeKey
        }));
    }

    return (
        <div className={styles.advanceSearch}>
            <Query/>
            <div className="tabs-wrapper">
                <Tabs defaultActiveKey={activeTab} activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab={`${utils.getText('applicability.a1')}(${count.applyCount})`} key="applicability">
                        <Applicability/>
                    </TabPane>
                    <TabPane tab={`${utils.getText('part.a7')}(${count.partCount})`} key="parts">
                        <Parts/>
                    </TabPane>
                    <TabPane tab={`${utils.getText('legend.a4')}(${count.legendCount})`} key="legends">
                        <Legends/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

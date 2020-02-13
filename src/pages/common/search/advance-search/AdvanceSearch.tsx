import React from 'react';
import {useSelector} from 'react-redux';
import {Tabs} from 'antd';
import styles from './AdvanceSearch.module.scss';
import {Query} from './query';
import {Applicability} from './applicability';
import {Parts} from './parts';
import {Legends} from './legends';

const TabPane = Tabs.TabPane;

export function AdvanceSearch(props: any) {
    const {
        queryParams,
        count
    } = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    return (
        <div className={styles.advanceSearch}>
            <Query/>
            <div className="grid">
                <Tabs defaultActiveKey="applicability">
                    <TabPane tab={`适用性清单(${count.applyCount})`} key="applicability">
                        <Applicability/>
                    </TabPane>
                    <TabPane tab={`零件清单(${count.partCount})`} key="parts">
                        <Parts/>
                    </TabPane>
                    <TabPane tab={`图例清单(${count.legendCount})`} key="legends">
                        <Legends/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

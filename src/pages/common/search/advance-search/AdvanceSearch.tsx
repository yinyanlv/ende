import React from 'react';
import {Tabs} from 'antd';
import styles from './AdvanceSearch.module.scss';
import {Query} from './query';
import {Applicability} from './applicability';
import {Parts} from './parts';
import {Legends} from './legends';

const TabPane = Tabs.TabPane;

export function AdvanceSearch(props: any) {

    return (
        <div className={styles.advanceSearch}>
            <Query />
            <div className="grid">
                <Tabs defaultActiveKey="applicable-list">
                    <TabPane tab="适用性清单(10)" key="applicable-list">
                        <Applicability/>
                    </TabPane>
                    <TabPane tab="零件清单(0)" key="part-list">
                        <Parts />
                    </TabPane>
                    <TabPane tab="图例清单(0)" key="legend-list">
                        <Legends />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

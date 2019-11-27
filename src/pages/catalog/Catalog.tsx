import React from 'react';
import {Tabs, Spin} from 'antd';
import styles from './Catalog.module.scss';
import {Crumbs} from '@/components/crumbs';

export function PageCatalog(props) {

    return (
        <>
            <Crumbs />
            <div className={styles.container}>
                <div className="panel panel-level-1">
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="五菱" key="1">
                            <Spin>
                                <div className="content">
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                    <h1>Content of Tab Pane 1</h1>
                                </div>
                            </Spin>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="宝骏" key="2">
                            Content of Tab Pane 2
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className="panel panel-level-2">
                </div>
                <div className="panel panel-level-3">
                </div>
            </div>
        </>
    );
}

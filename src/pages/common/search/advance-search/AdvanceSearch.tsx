import React from 'react';
import {Button, Cascader, Col, Form, Input, Pagination, Row, Table, Tabs} from 'antd';
import styles from './AdvanceSearch.module.scss';
import {Applicability} from './applicability';
import {Parts} from './parts';
import {Legends} from './legends';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export function AdvanceSearch() {

    const options = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <div className={styles.advanceSearch}>
            <div className="query">
                <Form className="ant-advanced-search-form" layout="inline" labelAlign="left">
                    <Row>
                        <Col span={8}>
                            <div className="vin-wrapper">
                                <FormItem label="VIN/VSN">
                                    <Input placeholder="请输入"/>
                                </FormItem>
                                <span className="btn">详细</span>
                            </div>
                        </Col>
                        <Col span={16}>
                            <FormItem label="车型">
                                <Cascader options={options} placeholder="品牌/目录/年份/车型"/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="主组">
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="图例编号">
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="图例描述">
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="图例备注">
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="零件编号">
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="零件描述">
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'center'}}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{marginLeft: 8}}>清空</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
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

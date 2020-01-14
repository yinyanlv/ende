import React from 'react';
import { Drawer, Tabs, Table, Form, Button, Row, Col, Input, Cascader, Pagination} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './AdvanceSearch.module.scss';
import { advanceSearchCreator } from './actions';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export function AdvanceSearch(props) {
    const dispatch = useDispatch();
    const advanceSearch = useSelector((state: any) => {
        return state.advanceSearch;
    });

    function handleClose() {
        dispatch(advanceSearchCreator.setIsShowAdvanceSearch({
            isShow: false
        }));
    }
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

    const columns = [
        {
            title: '目录',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '零件号',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '零件描述',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '年',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '左右',
            key: 'action',
            dataIndex: 'abc'
        },
        {
            title: '用途',
            key: 'action',
            dataIndex: 'abc'
        },
        {
            title: '图例描述',
            key: 'action',
            dataIndex: 'abc'
        },
        {
            title: '用量',
            key: 'action',
            dataIndex: 'abc'
        },
        {
            title: '主组描述',
            key: 'action',
            dataIndex: 'abc'
        }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <Drawer
            placement="right"
            closable={false}
            onClose={handleClose}
            visible={advanceSearch.isShow}
            width="900px"
            className={styles.advanceSearch}
        >
            <Tabs
                tabPosition="left"
                defaultActiveKey="1">
                <TabPane tab="高级查询" key="1">
                    <div>
                        <div className="title">高级查询</div>
                        <div className="query">
                            <Form className="ant-advanced-search-form" layout="inline" labelAlign="left"> 
                                <Row>
                                    <Col span={8}>
                                        <div className="vin-wrapper">
                                            <FormItem label="VIN/VSN">
                                                <Input placeholder="请输入" />
                                            </FormItem>
                                            <span className="btn">详细</span>
                                        </div>
                                    </Col>
                                    <Col span={16}> 
                                        <FormItem label="车型">  
                                            <Cascader options={options} placeholder="品牌/目录/年份/车型" /> 
                                        </FormItem> 
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="主组">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="图例编号">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="图例描述">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="图例备注">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="零件编号">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label="零件描述">
                                            <Input placeholder="请输入" />
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'center' }}>
                                        <Button type="primary" htmlType="submit">搜索</Button>
                                        <Button style={{ marginLeft: 8 }}>清空</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="grid">
                            <Tabs defaultActiveKey="applicable-list">
                                <TabPane tab="适用性清单(10)" key="applicable-list">
                                    <Table columns={columns} dataSource={data} />
                                </TabPane>
                                <TabPane tab="零件清单(0)" key="part-list">
                                    <div className="part-list-container">
                                        <div className="part-list">
                                            <div className="item">
                                                <div className="image-box"><img src={'/images/logo.png'} alt="logo"/></div>
                                                <ul>
                                                    <li><span className="btn">3444322</span> - <span>零件名称</span> <span>(<span>零件备注</span>)</span> </li>
                                                    <li>
                                                        <span>
                                                            <label>最小包装数：</label>3
                                                        </span>
                                                        <span>
                                                            <label>库位：</label>PA333
                                                        </span>
                                                        <span>
                                                            <label>运输方式：</label>海运
                                                        </span>
                                                        <span>
                                                            <label>价格：</label>海运
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div>
                                                    <Button type="primary">购买</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                             <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="图例清单(0)" key="legend-list">
                                    <div className="legend-list-container">
                                        <div className="legend-list">
                                            <div className="item">
                                                <div className="image-box"><img src={'/images/logo.png'} alt="logo"/></div>
                                                <ul>
                                                    <li><span className="btn">3444322</span> - <span>图例名称</span> <span>-<span>图例备注</span></span> </li>
                                                    <li>ccccc - 名称</li>
                                                    <li>ccccc - 名称</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                             <Pagination size="small" total={50} showSizeChanger showQuickJumper />
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="替换关系" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>,
        </Drawer>
    );
}

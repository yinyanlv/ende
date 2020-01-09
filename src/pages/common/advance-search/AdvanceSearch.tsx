import React from 'react';
import {Drawer, Tabs, Table, Form, Button, Row, Col, Input} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import styles from './AdvanceSearch.module.scss';
import {advanceSearchCreator} from './actions';

const TabPane = Tabs.TabPane;

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


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
        {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
                color = 'volcano';
            }
            return '';
        })}
      </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </span>
            ),
        },
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

   function getFields() {
        const count =  6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder" />)}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }
    return (
        <Drawer
            placement="right"
            closable={true}
            mask={false}
            onClose={handleClose}
            visible={advanceSearch.isShow}
            width="900px"
        >
            <Tabs
                tabPosition="left"
                defaultActiveKey="1">
                <TabPane tab="高级查询" key="1">
                    <div>
                        <div className="title">高级查询</div>
                        <div className="query">
                            <Form className="ant-advanced-search-form" >
                                <Row gutter={24}>{this.getFields()}</Row>
                                <Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit">
                                            Search
                                        </Button>
                                        <Button style={{ marginLeft: 8 }} >
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="grid">
                            <Tabs defaultActiveKey="applicable-list">
                                <TabPane tab="适用性清单(10)" key="applicable-list">
                                    <Table columns={columns} dataSource={data}/>
                                </TabPane>
                                <TabPane tab="零件清单(0)" key="part-list"></TabPane>
                                <TabPane tab="图例清单(0)" key="legend-list"></TabPane>
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

import React from 'react';
import {useSelector} from 'react-redux';
import {Button, Col, Form, Input, Pagination, Row, Table, Tabs} from 'antd';

const FormItem = Form.Item;

export function Replace() {

    const {self} = useSelector((state: any) => {
        return state.search.replace;
    });

    const columns = [
        {
            title: '老件编号',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '适用车型',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '新件编号',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '适用车型',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '替换类型',
            key: 'action',
            dataIndex: 'abc'
        },
        {
            title: '断点',
            key: 'action',
            dataIndex: 'abc'
        },
        {
            title: '备注',
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
        <div>
            <div className="query">
                <Form className="ant-advanced-search-form" layout="inline" labelAlign="left">
                    <Row>
                        <Col span={8}>
                            <div className="vin-wrapper">
                                <FormItem label="零件编号">
                                    <Input placeholder="请输入"/>
                                </FormItem>
                            </div>
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
                <div className="part-list-container">
                    <div className="part-list">
                        <Table columns={columns} dataSource={data}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

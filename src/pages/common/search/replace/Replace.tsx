import React from 'react';
import {useSelector} from 'react-redux';
import {Button, Col, Form, Input, Pagination, Row, Table, Tabs} from 'antd';
import {Query} from './query';

const FormItem = Form.Item;

export function Replace() {

    const {self} = useSelector((state: any) => {
        return state.search.replace;
    });

    const columns = [
        {
            title: '老件编号',
            dataIndex: 'name'
        },
        {
            title: '适用车型',
            dataIndex: 'age'
        },
        {
            title: '新件编号',
            dataIndex: 'address'
        },
        {
            title: '适用车型',
            dataIndex: 'tags'
        },
        {
            title: '替换类型',
            dataIndex: 'abc1'
        },
        {
            title: '断点',
            dataIndex: 'abc2'
        },
        {
            title: '备注',
            dataIndex: 'abc3'
        }
    ];

    const data = [
    ];

    return (
        <div>
            <Query />
            <div className="grid">
                <div>
                    <Table columns={columns} dataSource={data} rowKey={'key'}/>
                </div>
            </div>
        </div>
    );
}

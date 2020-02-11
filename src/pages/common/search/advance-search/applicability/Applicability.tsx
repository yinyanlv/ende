import React from 'react';
import {Table} from 'antd';

export function Applicability() {

    const columns = [
        {
            title: '目录',
            dataIndex: 'name',
        },
        {
            title: '零件号',
            dataIndex: 'age',
        },
        {
            title: '零件描述',
            dataIndex: 'address',
        },
        {
            title: '年',
            dataIndex: 'tags'
        },
        {
            title: '左右',
            dataIndex: 'abc'
        },
        {
            title: '用途',
            dataIndex: 'abc1'
        },
        {
            title: '图例描述',
            dataIndex: 'abc2'
        },
        {
            title: '用量',
            dataIndex: 'abc3'
        },
        {
            title: '主组描述',
            dataIndex: 'abc4'
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
        <Table columns={columns} dataSource={data} rowKey={'key'}/>
    );
}

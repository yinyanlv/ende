import React from 'react';
import {Table} from 'antd';

export function Applicability() {

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
        <Table columns={columns} dataSource={data}/>
    );
}

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
            title: '年',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '左右',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '用途',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '主组描述',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '图例描述',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '零件描述',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '用量',
            key: 'tags',
            dataIndex: 'tags'
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
            <Table columns={columns} dataSource={data}/>
        </div>
    );
}

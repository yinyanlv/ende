import React from 'react';
import {Table} from "antd";

export function Replace() {

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
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '断点',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '备注',
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

import React from 'react';
import {useDispatch} from 'react-redux';
import {Table} from 'antd';
import {vinSearchCreator} from '@/pages/common/vin-search/actions';

export function VsnSelector() {
    const dispatch = useDispatch();

    function handleClickRow(record) {
        dispatch(vinSearchCreator.doVsnSearch(record));
    }

    const columns = [
        {
            title: '车型',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '目录',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '开始时间',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '结束时间',
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
            <Table columns={columns} dataSource={data} onRowClick={handleClickRow}/>
        </div>
    );
}

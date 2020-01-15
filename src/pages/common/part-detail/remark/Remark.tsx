import React from 'react';
import {Table, Button, Tooltip} from 'antd';

export function Remark() {

    const columns = [
        {
            title: '序号',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '备注内容',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '备注类型',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '备注用户',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '修改时间',
            key: 'tags',
            dataIndex: 'tags'
        },
        {
            title: '操作',
            key: 'tags',
            dataIndex: 'tags',
            render: () => {
                return (
                    <div>
                    <Tooltip title={'编辑'}>
                        <Button type="primary" icon="edit" size={'small'} />
                    </Tooltip>
                    <Tooltip title={'删除'}>
                        <Button type="primary" icon="delete" size={'small'} />
                    </Tooltip>
                    </div>
                );
            }
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
            <Button type="dashed" block>
                +新增备注
            </Button>
            <Table columns={columns} dataSource={data}/>
        </div>
    );
}

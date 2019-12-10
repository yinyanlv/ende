import React from 'react';
import {Button, Table} from 'antd';
import {Link} from 'react-router-dom';
import styles from './Parts.module.scss';

export function Parts() {

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
    }, {
        title: '零件编号',
        dataIndex: 'partNumber',
        width: 100,
        render: (text, record) => (
            <span>
            <Link to='/part/111111'>{text}</Link>
            </span>
        )
    }, {
        title: '左右',
        dataIndex: 'age',
        width: 50
    }, {
        title: '名称描述',
        dataIndex: 'name'
    }, {
        title: '年',
        dataIndex: 'year',
        width: 60
    }, {
        title: '用途',
        dataIndex: 'usage'
    }, {
        title: '量',
        dataIndex: 'count',
        width: 40
    }, {
        title: '操作',
        dataIndex: '',
        width: 80,
        render: (text, record) => (
            <span>
            <Button>购买</Button>
            </span>
        )
    }];

    const data: any = [];
    for (let i = 0; i < 30; i++) {
        data.push({
            key: i,
            callout: i,
            name: `凸轮轴轴承盖螺栓`,
            year: 2018,
            age: 32,
            count: 121,
            partNumber: 23864864,
            usage: `(DB)(DC)(DD) 36 (LJO M2P)`,
        });
    }

    return (
        <Table columns={columns}
               dataSource={data}
               size={'small'}
               scroll={{y: styles.partsTableBodyHeight}}
               className={styles.partList}
               pagination={false}
        />
    );
}

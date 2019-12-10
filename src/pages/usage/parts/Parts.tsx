import React from 'react';
import {Button, Table} from 'antd';
import {Link} from 'react-router-dom';
import styles from './Parts.module.scss';

export function Parts(props: any) {

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
    }, {
        title: '零件编号',
        dataIndex: 'partCode',
        width: 140,
        render: (val, record) => {
            return (
                <span>
                    <Link to={'/part/' + val}>{val}</Link>
                </span>
            );
        }
    }, {
        title: '左右',
        dataIndex: 'handName',
        width: 70
    }, {
        title: '名称描述',
        dataIndex: 'name'
    }, {
        title: '用途',
        dataIndex: 'usage'
    }, {
        title: '量',
        dataIndex: 'formattedQty',
        width: 40
    }, {
        title: '操作',
        dataIndex: '',
        width: 80,
        render: (val, record) => (
            <span>
            <Button>购买</Button>
            </span>
        )
    }];

    return (
        <Table columns={columns}
               dataSource={props.data || []}
               rowKey={'partCode'}
               size={'small'}
               scroll={{y: styles.partsTableBodyHeight}}
               className={styles.partList}
               pagination={false}
        />
    );
}

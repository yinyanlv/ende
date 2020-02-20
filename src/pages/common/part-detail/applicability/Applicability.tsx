import React from 'react';
import {useSelector} from 'react-redux';
import {Table} from 'antd';
import styles from './Applicability.module.scss';

export function Applicability() {
    const {list} = useSelector((state: any) => {
        return state.partDetail.applicability;
    });

    const columns = [
        {
            title: '目录',
            dataIndex: 'catalogueCode',
            ellipsis: true,
            width: 80
        },
        {
            title: '左右',
            dataIndex: 'handName',
            ellipsis: true,
            width: 80
        },
        {
            title: '用途',
            dataIndex: 'note',
            ellipsis: true,
            width: 100
        },
        {
            title: '主组描述',
            dataIndex: 'legendGroupName',
            ellipsis: true,
            width: 140
        },
        {
            title: '图例描述',
            dataIndex: 'legendName',
            ellipsis: true,
            width: 140
        },
        {
            title: '零件描述',
            dataIndex: 'partName',
            ellipsis: true,
            width: 140
        },
        {
            title: '用量',
            dataIndex: 'qty',
            ellipsis: true,
            width: 80
        }
    ];

    return (
        <div className={styles.replace}>
            <Table
                columns={columns}
                dataSource={list}
                pagination={false}
                rowKey={'id'}
                tableLayout={'fixed'}
            />
        </div>
    );
}

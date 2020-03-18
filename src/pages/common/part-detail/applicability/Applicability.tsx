import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'antd';
import queryString from 'query-string';
import history from '@/common/history';
import {usageCreator} from '@/pages/usage/actions';
import styles from './Applicability.module.scss';
import {getQueryObjFromRecord, isAtPateUsage} from "@/common/utils";
import {Application} from '@/pages/common/application';

export function Applicability() {
    const dispatch = useDispatch();
    const {list} = useSelector((state: any) => {
        return state.partDetail.applicability;
    });

    const columns = [
        {
            title: '目录',
            dataIndex: 'catalogueCode',
            ellipsis: true,
            width: 100
        },
        {
            title: '左右',
            dataIndex: 'handName',
            ellipsis: true,
            width: 60
        },
        {
            title: '用途',
            dataIndex: 'note',
            ellipsis: true,
            width: 140,
            render: (val, record) => (
                <Application list={record.options || []}>
                    <span>{val}</span>
                </Application>
            )
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

    function handleClickRow(record) {
        const queryObj = getQueryObjFromRecord(record);
        const isNeedManualRefresh = isAtPateUsage();
        history.push({
            pathname: '/usage',
            search: queryString.stringify(queryObj)
        });
        if (isNeedManualRefresh) {
            dispatch(usageCreator.initUsage());
        }
    }

    return (
        <div className={styles.applicability}>
            <Table
                columns={columns}
                dataSource={list}
                className={list.length > 0 ? '' : 'empty-table'}
                pagination={false}
                rowKey={'id'}
                tableLayout={'fixed'}
                scroll={{
                    x: styles.tableInnerWidth,
                    y: styles.tableBodyHeight
                } as any}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            handleClickRow(record);
                        }
                    }
                }}
            />
        </div>
    );
}

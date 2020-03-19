import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'antd';
import queryString from 'query-string';
import history from '@/common/history';
import {usageCreator} from '@/pages/usage/actions';
import styles from './Applicability.module.scss';
import {getQueryObjFromRecord, isAtPateUsage} from "@/common/utils";
import {Application} from '@/pages/common/application';
import {applicabilityCreator} from './actions';
import {useUtils} from '@/hooks';

export function Applicability() {
    const dispatch = useDispatch();
    const {list, selectedKeys} = useSelector((state: any) => {
        return state.partDetail.applicability;
    });
    const utils = useUtils();

    const columns = [
        {
            title: utils.getText('applicability.a2'),
            dataIndex: 'catalogueCode',
            ellipsis: true,
            width: 100
        },
        {
            title: utils.getText('part.a8'),
            dataIndex: 'handName',
            ellipsis: true,
            width: 60
        },
        {
            title: utils.getText('part.a9'),
            dataIndex: 'note',
            ellipsis: true,
            width: 140,
            render: (val, record) => {
                if (record.options && record.options.length) {
                    return (
                        <Application list={record.options}>
                            <span className={'ellipsis-text'} title={val}>{val}</span>
                        </Application>
                    );
                } else {
                    return <span title={val}>{val}</span>;
                }
            }
        },
        {
            title: utils.getText('part.a13'),
            dataIndex: 'legendGroupName',
            ellipsis: true,
            width: 140
        },
        {
            title: utils.getText('legend.a2'),
            dataIndex: 'legendName',
            ellipsis: true,
            width: 140
        },
        {
            title: utils.getText('part.a2'),
            dataIndex: 'partName',
            ellipsis: true,
            width: 140
        },
        {
            title: utils.getText('part.a10'),
            dataIndex: 'qty',
            ellipsis: true,
            width: 80
        }
    ];

    function handleClickRow(record) {
        const queryObj = getQueryObjFromRecord(record);
        const isNeedManualRefresh = isAtPateUsage();
        dispatch(applicabilityCreator.setSelectedKeys([record.id]));
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
                className={list.length > 0 ? 'hide-select-column' : 'hide-select-column empty-table'}
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
                rowSelection={{
                    type: 'radio',
                    selectedRowKeys: selectedKeys
                }}
            />
        </div>
    );
}

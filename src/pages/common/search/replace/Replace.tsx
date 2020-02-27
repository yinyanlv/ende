import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'antd';
import {Query} from './query';
import styles from './Replace.module.scss';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {Loading} from "@/components/loading";

export function Replace() {
    const dispatch = useDispatch();
    const {list, partCode, isLoading} = useSelector((state: any) => {
        return state.search.replace.self;
    });

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode,
            activeTab: 'replace'
        }));
    }

    const columns = [
        {
            title: '老件编号',
            dataIndex: 'oldPartCode',
            width: 120,
            ellipsis: true,
            render: (val, record) => {
                if (record.hasOldPartDetail) {
                    if (val === partCode) {
                        return (
                            <span className="current">{val}</span>
                        );
                    } else {
                        return (
                            <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                        );
                    }
                } else {
                    return val;
                }
            }
        },
        {
            title: '适用车型',
            width: 120,
            ellipsis: true,
            dataIndex: 'oldApplyCode'
        },
        {
            title: '新件编号',
            dataIndex: 'newPartCode',
            width: 120,
            ellipsis: true,
            render: (val, record) => {
                if (record.hasNewPartDetail) {
                    if (val === partCode) {
                        return (
                            <span className="current">{val}</span>
                        );
                    } else {
                        return (
                            <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                        );
                    }
                } else {
                    return val;
                }
            }
        },
        {
            title: '适用车型',
            width: 120,
            ellipsis: true,
            dataIndex: 'newApplyCode'
        },
        {
            title: '替换类型',
            width: 120,
            ellipsis: true,
            dataIndex: 'typeName'
        },
        {
            title: '断点',
            width: 140,
            ellipsis: true,
            dataIndex: 'formattedDateTime'
        },
        {
            title: '备注',
            ellipsis: true,
            dataIndex: 'note'
        }
    ];

    return (
        <div>
            <Query/>
            <Loading isLoading={isLoading}>
                <div className={styles.replace}>
                    <Table
                        columns={columns}
                        dataSource={list}
                        pagination={false}
                        rowKey={'newPartCode'}
                    />
                </div>
            </Loading>
        </div>
    );
}

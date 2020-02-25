import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'antd';
import styles from './Replace.module.scss';
import {partDetailCreator} from '@/pages/common/part-detail/actions';

interface ReplaceProps {
    partCode: any;
}

export function Replace(props: ReplaceProps) {
    const dispatch = useDispatch();
    const {list} = useSelector((state: any) => {
        return state.partDetail.replace;
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
                    if (val === props.partCode) {
                        return (
                            <span className="current">{val}</span>
                        );
                    } else {
                        return (
                            <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                        );
                    }
                } else  {
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
                    if (val === props.partCode) {
                        return (
                            <span className="current">{val}</span>
                        );
                    } else {
                        return (
                            <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                        );
                    }
                } else  {
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
        <div className={styles.replace}>
            <Table
                columns={columns}
                dataSource={list}
                pagination={false}
                rowKey={'newPartCode'}
                tableLayout={'fixed'}
            />
        </div>
    );
}

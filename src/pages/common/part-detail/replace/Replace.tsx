import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'antd';
import styles from './Replace.module.scss';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {useUtils} from '@/hooks';

interface ReplaceProps {
    partCode: any;
}

export function Replace(props: ReplaceProps) {
    const dispatch = useDispatch();
    const {list} = useSelector((state: any) => {
        return state.partDetail.replace;
    });
    const utils = useUtils();

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode,
            activeTab: 'replace'
        }));
    }

    const columns = [
        {
            title: utils.getText('replace.a2'),
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
                            <span className="text-btn" onClick={handleClickPartCode.bind(null, val)}>{val}</span>
                        );
                    }
                } else  {
                    return val;
                }
            }
        },
        {
            title: utils.getText('replace.a3'),
            width: 120,
            ellipsis: true,
            dataIndex: 'oldApplyCode'
        },
        {
            title: utils.getText('replace.a3'),
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
                            <span className="text-btn" onClick={handleClickPartCode.bind(null, val)}>{val}</span>
                        );
                    }
                } else  {
                    return val;
                }
            }
        },
        {
            title: utils.getText('replace.a3'),
            width: 120,
            ellipsis: true,
            dataIndex: 'newApplyCode'
        },
        {
            title: utils.getText('replace.a5'),
            width: 120,
            ellipsis: true,
            dataIndex: 'typeName'
        },
        {
            title: utils.getText('replace.a6'),
            width: 140,
            ellipsis: true,
            dataIndex: 'formattedDateTime'
        },
        {
            title: utils.getText('part.a14'),
            ellipsis: true,
            width: 140,
            dataIndex: 'note'
        }
    ];

    return (
        <div className={styles.replace}>
            <Table
                columns={columns}
                dataSource={list}
                className={list.length > 0 ? '' : 'empty-table'}
                pagination={false}
                rowKey={'newPartCode'}
                tableLayout={'fixed'}
                scroll={{
                    x: styles.tableInnerWidth,
                    y: styles.tableBodyHeight
                } as any}
            />
        </div>
    );
}

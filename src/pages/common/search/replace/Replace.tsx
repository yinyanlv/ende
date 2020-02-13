import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from 'antd';
import {Query} from './query';
import styles from './Replace.module.scss';
import {partDetailCreator} from '@/pages/common/part-detail/actions';

export function Replace() {
    const dispatch = useDispatch();
    const {list} = useSelector((state: any) => {
        return state.search.replace.self;
    });

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.setIsShowPartDetail({
            isShow: true,
            partCode: partCode
        }));
    }

    const columns = [
        {
            title: '老件编号',
            dataIndex: 'oldPartCode',
            width: 120,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                );
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
                return (
                    <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                );
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
            <Query />
            <div className={styles.replace}>
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                    rowKey={'key'}
                />
            </div>
        </div>
    );
}

import React from 'react';
import {Pagination, Table} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {applicabilityCreator} from './actions';
import styles from './Applicability.module.scss';
import {partDetailCreator} from '@/pages/common/part-detail/actions';

export function Applicability() {

    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize} = useSelector((state: any) => {
        return state.search.advanceSearch.applicability;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadPartDetail({
            partCode: partCode
        }));
    }

    const columns = [
        {
            title: '目录',
            dataIndex: 'catalogueCode',
            ellipsis: true,
            width: 80
        },
        {
            title: '零件号',
            dataIndex: 'partCode',
            width: 120,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <a className="btn" onClick={handleClickPartCode.bind(null, val)}>{val}</a>
                );
            }
        },
        {
            title: '零件描述',
            dataIndex: 'partName',
            ellipsis: true,
            width: 140
        },
        {
            title: '左右',
            dataIndex: 'hand',
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
            title: '图例描述',
            dataIndex: 'legendName',
            ellipsis: true,
            width: 140
        },
        {
            title: '图例备注',
            dataIndex: 'legendNote',
            ellipsis: true,
            width: 140
        },
        {
            title: '用量',
            dataIndex: 'qty',
            ellipsis: true,
            width: 80
        },
        {
            title: '主组描述',
            dataIndex: 'legendGroupName',
            ellipsis: true,
            width: 140
        }
    ];

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(applicabilityCreator.doQuery(queryParams));
    }

    return (
        <div>
            <div className={styles.applicability}>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={'id'}
                    tableLayout={'fixed'}
                    pagination={false}
                    scroll={{
                        x: true,
                        y: true
                    }}
                />
            </div>
            <div className={styles.pagination}>
                <Pagination
                    total={total}
                    current={pageNo}
                    pageSize={pageSize}
                    pageSizeOptions={['5', '10', '20']}
                    showSizeChanger
                    showQuickJumper
                    onChange={doQuery}
                    onShowSizeChange={doQuery}
                />
            </div>
        </div>
    );
}

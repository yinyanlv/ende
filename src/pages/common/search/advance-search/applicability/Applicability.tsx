import React from 'react';
import {Pagination, Table} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import queryString from 'query-string';
import history from '@/common/history';
import {usageCreator} from '@/pages/usage/actions';
import {isAtPateUsage, getQueryObjFromRecord} from '@/common/utils';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {applicabilityCreator} from './actions';
import styles from './Applicability.module.scss';
import {Loading} from "@/components/loading";

export function Applicability() {

    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize, isLoading} = useSelector((state: any) => {
        return state.search.advanceSearch.applicability;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    function handleClickPartCode(e, partCode) {
        e.stopPropagation();
        dispatch(partDetailCreator.loadAndShowPartDetail({
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
                    <a className="btn" onClick={(e) => {

                        handleClickPartCode(e, val);
                    }}>{val}</a>
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
        <Loading isLoading={isLoading}>
            <div className={styles.applicability}>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={'id'}
                    tableLayout={'fixed'}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                handleClickRow(record);
                            }
                        }
                    }}
                    pagination={false}
                    scroll={{
                        x: styles.tableInnerWidth,
                        y: styles.tableBodyHeight
                    }}
                />
            </div>
            <div className="pagination">
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
        </Loading>
    );
}

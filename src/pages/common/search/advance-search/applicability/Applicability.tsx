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
import {configCreator} from '@/store/config/actions';
import {Application} from '@/pages/common/application';

export function Applicability() {

    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize, isLoading} = useSelector((state: any) => {
        return state.search.advanceSearch.applicability;
    });
    const {maxZIndex} = useSelector((state: any) => {
        return state.config;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });

    function handleClickPartCode(e, partCode) {
        e.stopPropagation();
        const newMaxZIndex = maxZIndex + 5;
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode,
            zIndex: newMaxZIndex
        }));
        dispatch(configCreator.setMaxZIndex({
            maxZIndex: newMaxZIndex
        }));
    }

    const columns = [
        {
            title: '目录',
            dataIndex: 'catalogueCode',
            ellipsis: true,
            width: 100
        },
        {
            title: '零件号',
            dataIndex: 'partCode',
            width: 120,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <span className="text-btn" onClick={(e) => {
                        handleClickPartCode(e, val);
                    }}>{val}</span>
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
            width: 60
        },
        {
            title: '用途',
            dataIndex: 'note',
            ellipsis: true,
            width: 140,
            render: (val, record) => {
                if (record.options && record.options.length) {
                    return (
                        <Application list={record.options}>
                            <span  className={'ellipsis-text'} title={val}>{val}</span>
                        </Application>
                    );
                } else {
                    return <span title={val}>{val}</span>;
                }
            }
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
                    className={list.length > 0 ? '' : 'empty-table'}
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
                    } as any}
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

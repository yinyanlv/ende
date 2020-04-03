import React from 'react';
import {Button, Pagination, Table, Tooltip} from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons';
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
import {useUtils} from '@/hooks';
import {NoData} from '@/components/no-data';
import {Buy} from '@/pages/common/buy';

export function Applicability() {

    const dispatch = useDispatch();
    const {list, total, pageNo, pageSize, isLoading, selectedKeys} = useSelector((state: any) => {
        return state.search.advanceSearch.applicability;
    });
    const {maxZIndex} = useSelector((state: any) => {
        return state.config;
    });
    const {queryParams} = useSelector((state: any) => {
        return state.search.advanceSearch.self;
    });
    const utils = useUtils();

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
            title: utils.getText('applicability.a2'),
            dataIndex: 'catalogueCode',
            ellipsis: true,
            width: 110,
            render: (val, record) => {
                return record && record.catalogueName ? `${val} - ${record.catalogueName}` : val;
            }
        },
        {
            title: utils.getText('part.a1'),
            dataIndex: 'partCode',
            width: 150,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <div className={'operator-wrapper'}>
                    <span className="text-btn" title={val} onClick={(e) => {
                        handleClickPartCode(e, val);
                    }}>{val}</span>
                        <span className="btns">
                            {
                                record.price && <Tooltip title={record.price}>
                                    <i className={'iconfont icon-money'}/>
                                </Tooltip>
                            }
                            {
                                record.cart && <Tooltip title={utils.getText('cart.a7')}>
                                    <i className={'iconfont icon-add-cart'}/>
                                </Tooltip>
                            }
                        </span>
                    </div>
                );
            }
        },
        {
            title: utils.getText('part.a8'),
            dataIndex: 'handName',
            ellipsis: true,
            width: 60
        },
        {
            title: utils.getText('part.a2'),
            dataIndex: 'partName',
            ellipsis: true,
            width: 160
        },
        {
            title: utils.getText('part.a9'),
            dataIndex: 'note',
            ellipsis: true,
            width: 150,
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
            title: utils.getText('legend.a2'),
            dataIndex: 'legendName',
            ellipsis: true,
            width: 180
        },
        {
            title: utils.getText('part.a10'),
            dataIndex: 'qty',
            ellipsis: true,
            width: 60
        },
        {
            title: utils.getText('part.a13'),
            dataIndex: 'legendGroupName',
            ellipsis: true,
            width: 160
        }, {
            title: utils.getText('operate.a5'),
            ellipsis: true,
            width: 60,
            fixed: 'right',
            render: (val, record) => (
                <Buy partCode={record.partCode} checkContainerScroll={true}
                     containerSelector={'#search-applicability-container div.ant-table-body'}>
                    <Button type="primary" title={utils.getText('operate.a4')}
                            icon={<ShoppingCartOutlined/>}
                            size={'small'}/>
                </Buy>
            )
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
        const callout = record.callout;
        const isNeedManualRefresh = isAtPateUsage();
        dispatch(applicabilityCreator.setSelectedKeys([record.id]));
        history.push({
            pathname: '/usage',
            search: queryString.stringify(queryObj),
            hash: callout ? `callout=${callout}` : ''
        });
        if (isNeedManualRefresh) {
            dispatch(usageCreator.initUsage());
        }
    }

    return (
        <Loading isLoading={isLoading}>
            <div className={styles.applicability} id={'search-applicability-container'}>
                <Table
                    columns={columns as any}
                    dataSource={list}
                    className={list.length > 0 ? 'hide-select-column' : 'hide-select-column empty-table'}
                    rowKey={'id'}
                    tableLayout={'fixed'}
                    locale={{
                        emptyText: <NoData/>
                    }}
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

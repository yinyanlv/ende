import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, InputNumber, Pagination, Button} from 'antd';
import {Loading} from '@/components/loading';
import {cartCreator} from './actions';
import styles from './Cart.module.scss';
import {Query} from './query';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {useUtils} from '@/hooks';

export function Cart(props) {

    const dispatch = useDispatch();
    const {orderCode} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const {total, list, pageNo, pageSize, queryParams, isLoading, selectedRecords} = useSelector((state: any) => {
        return state.orderDetail.cart.self;
    });
    const selectedKeys = selectedRecords.map((item) => {
        return item.id;
    });
    const utils = useUtils();

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(cartCreator.doQuery(queryParams));
    }

    function handleEditQty(params) {
        dispatch(cartCreator.editQty({
            orderCode,
            partCode: params.partCode,
            qty: params.qty,
            list
        }));
    }

    function handleClickDelete(partCode) {
        dispatch(cartCreator.deleteParts({
            orderCode,
            partCodes: [partCode]
        }));
    }

    function handleSelect(record) {
        const key = record.id;
        const isIncluded = isInclude(key);
        const rows = [...selectedRecords];
        let records: any[] = [];

        if (isIncluded) {
            records = rows.filter((item) => {
                return item.id !== key ? true : false;
            });
        } else {
            rows.push({
                id: record.id,
                partCode: record.partCode
            });
            records = rows;
        }

        dispatch(cartCreator.setSelectedRecords(records));
    }

    function handleSelectAll(selected, _selectedRows, _changeRows) {

        if (selected) {
            const records = list.map((item) => {
                return {
                    id: item.id,
                    partCode: item.partCode
                };
            });
            dispatch(cartCreator.setSelectedRecords(records));
        } else {
            dispatch(cartCreator.setSelectedRecords([]));
        }
    }

    function isInclude(key) {

        return selectedRecords.some((item) => {
            return item.id === key;
        });
    }

    function handleDeleteSelected() {
        const partCodes = getSelectedPartCodes();

        dispatch(cartCreator.deleteParts({
            orderCode,
            partCodes
        }));
        dispatch(cartCreator.setSelectedRecords([]));
    }

    function getSelectedPartCodes() {
        return selectedRecords.map((item) => {
            return item.partCode;
        });
    }

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode
        }));
    }

    const columns = [
        {
            title: '零件编号',
            dataIndex: 'partCode',
            width: 150,
            ellipsis: true,
            render(val) {
                return <span className="text-btn" onClick={(e) => {
                    e.stopPropagation();
                    handleClickPartCode(val);
                }}>{val}</span>
            }
        },
        {
            title: '描述',
            dataIndex: 'partName',
            width: 250,
            ellipsis: true
        },
        {
            title: '量',
            dataIndex: 'qty',
            render: (val, record) => {
                return (
                    <div onClick={utils.stopPropagation}>
                        <InputNumber value={val}
                                     onChange={(val) => {
                                         handleEditQty({
                                             partCode: record.partCode,
                                             qty: val
                                         });
                                     }}/>
                    </div>
                );
            }
        },
        {
            title: '最小包装数',
            dataIndex: 'unitPkgQty'
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: function (val) {
                return val && val.formatString;
            }
        },
        {
            title: '小计(元)',
            dataIndex: 'amount',
            render: function (val) {
                return val && val.formatString;
            }
        },
        {
            title: '操作',
            dataIndex: 'operator',
            render: (val, record) => {
                return (
                    <div>
                        <span className={'pure-text-btn'} onClick={(e) => {
                            e.stopPropagation();
                            handleClickDelete(record.partCode);
                        }}>删除</span>
                    </div>
                );
            }
        }
    ];

    return (
        <div className={styles.cart}>
            <div className="box">
                <div className="box-title">
                    <span className={'title'}>商品清单</span>
                </div>
                <Query/>
                <Loading isLoading={isLoading}>
                    <div className="box-content">
                        <Table
                            columns={columns}
                            dataSource={list}
                            rowKey={'id'}
                            tableLayout={'fixed'}
                            pagination={false}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        handleSelect(record);
                                    }
                                };
                            }}
                            rowSelection={{
                                selectedRowKeys: selectedKeys,
                                onSelectAll: handleSelectAll
                            }}
                        />
                    </div>
                    <div className="pagination">
                        <div className="operators">
                            <Button onClick={handleDeleteSelected} disabled={!selectedRecords.length}>删除</Button>
                        </div>
                        <Pagination
                            total={total}
                            current={pageNo}
                            pageSize={pageSize}
                            pageSizeOptions={['5', '10', '20']}
                            showSizeChanger
                            showQuickJumper
                            onChange={doQuery}
                            showLessItems={true}
                            onShowSizeChange={doQuery}
                        />
                    </div>
                </Loading>
            </div>
        </div>
    );
}

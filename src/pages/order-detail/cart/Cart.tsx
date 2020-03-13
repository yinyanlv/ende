import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, InputNumber, Pagination, Button} from 'antd';
import {Loading} from '@/components/loading';
import {cartCreator} from './actions';
import styles from './Cart.module.scss';
import {Query} from './query';
import {partDetailCreator} from '@/pages/common/part-detail/actions';

export function Cart(props) {

    const dispatch = useDispatch();
    const {orderCode} = useSelector((state: any) => {
        return state.orderDetail.self;
    });

    const {total, list, pageNo, pageSize, queryParams, isLoading, selectedRecords} = useSelector((state: any) => {
        return state.orderDetail.cart.self;
    });

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

    function handleClickDelete(e, partCode) {
        e.stopPropagation();
        dispatch(cartCreator.deleteParts({
            orderCode,
            partCodes: [partCode]
        }));
    }

    function handleSelect(keys, records) {
        const rows = records.filter((item) => {
            return item ? true : false;
        }).map((item) => {
            return {
                id: item.id,
                partCode: item.partCode
            }
        });
        dispatch(cartCreator.setSelectedRecords(rows));
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
                return <span className="text-btn" onClick={handleClickPartCode.bind(null, val)}>{val}</span>
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
                return <InputNumber value={val}
                                    onBlur={(e) => {
                                        const val = e.target.value;
                                        handleEditQty({
                                            partCode: record.partCode,
                                            qty: val
                                        });
                                    }}/>
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
                            handleClickDelete(e, record.partCode);
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
                            rowKey={'partCode'}
                            tableLayout={'fixed'}
                            pagination={false}
                            rowSelection={{
                                onChange: handleSelect
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

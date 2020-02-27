import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button, Form, Row, Col, Input, Table, InputNumber, Tooltip, Pagination} from 'antd';
import {Loading} from '@/components/loading';
import {ordersCreator} from './actions';
import styles from './Orders.module.scss';
import {Query} from './query';

export function PageOrders(props) {

    const dispatch = useDispatch();
    const {total, list, pageNo, pageSize, queryParams, isLoading} = useSelector((state: any) => {
        return state.orders.self;
    });

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(ordersCreator.doQuery(queryParams));
    }

    function handleClickOrderCode(orderCode) {
    }

    function handleClickDelete(e, orderCode) {
        e.stopPropagation();
        dispatch(ordersCreator.deleteOrder({
            codes: [orderCode]
        }));
    }

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'code',
            width: 200
        },
        {
            title: '下单日期',
            dataIndex: 'createdDate',
        },
        {
            title: '订单备注',
            dataIndex: 'note',
        },
        {
            title: '状态',
            dataIndex: 'statusDesc',
        },
        {
            title: '下单维修站编码',
            dataIndex: 'purchaserDealerCode',
        },
        {
            title: '下单维修站名称',
            dataIndex: 'purchaserDealerName',
        },
        {
            title: '收货维修站编码',
            dataIndex: 'receiverDealerCode',
        },
        {
            title: '收货维修站名称',
            dataIndex: 'receiverDealerName',
        },
        {
            title: '订单金额',
            dataIndex: 'amount',
        },
        {
            title: '操作',
            dataIndex: 'operator',
            render: (val, record) => {
                return (
                    <div>
                        <a className={'btn'} onClick={(e) => {
                            handleClickDelete(e, record.partCode);
                        }}>删除</a>
                    </div>
                );
            }
        }
    ];

    return (
        <div className={styles.orders}>
            <div className="title-line">
                <span>购物车</span>
            </div>
            <Query />
            <Loading isLoading={isLoading}>
                <div>
                    <Table
                        columns={columns}
                        dataSource={list}
                        rowKey={'code'}
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
                        showLessItems={true}
                        onShowSizeChange={doQuery}
                    />
                </div>
            </Loading>
        </div>
    );
}

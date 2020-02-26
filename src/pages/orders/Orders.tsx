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
            title: '零件信息',
            dataIndex: 'partCode',
            width: 450,
        },
        {
            title: '量',
            dataIndex: 'qty',
        },
        {
            title: '小计(元)',
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
            <div className="drawer-title">
                <span>购物车</span>
            </div>
            <Query />
            <Loading isLoading={isLoading}>
                <div>
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
                        showLessItems={true}
                        onShowSizeChange={doQuery}
                    />
                </div>
            </Loading>
        </div>
    );
}

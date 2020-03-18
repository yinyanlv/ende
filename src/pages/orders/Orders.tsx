import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Pagination} from 'antd';
import moment from 'moment';
import history from '@/common/history';
import {Loading} from '@/components/loading';
import {ordersCreator} from './actions';
import styles from './Orders.module.scss';
import {Query} from './query';

export function PageOrders(props) {

    const dispatch = useDispatch();
    const {total, list, pageNo, pageSize, queryParams, isLoading} = useSelector((state: any) => {
        return state.orders.self;
    });

    useEffect(() => {
       dispatch(ordersCreator.initOrders());
    }, []);

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(ordersCreator.doQuery(queryParams));
    }

    function handleClickOrderCode(orderCode) {
        if (orderCode)  {
            history.push({
                pathname: `/order/${orderCode}`
            });
        }
    }

    function handleClickDelete( orderCode) {
        dispatch(ordersCreator.deleteOrder({
            orderCode: orderCode
        }));
    }

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'code',
            width: 240,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <span className={'text-btn'} onClick={handleClickOrderCode.bind(null, record.code)}>{val}</span>
                );
            }
        },
        {
            title: '下单日期',
            dataIndex: 'createdDate',
            width: 180,
            ellipsis: true,
            render(val) {
                return val && moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: '订单备注',
            dataIndex: 'note',
            width: 140,
            ellipsis: true
        },
        {
            title: '状态',
            dataIndex: 'statusDesc',
            width: 100,
            ellipsis: true
        },
        {
            title: '下单维修站编码',
            dataIndex: 'purchaserDealerCode',
            width: 140,
            ellipsis: true
        },
        {
            title: '下单维修站名称',
            dataIndex: 'purchaserDealerName',
            width: 200,
            ellipsis: true
        },
        {
            title: '收货维修站编码',
            dataIndex: 'receiverDealerCode',
            width: 140,
            ellipsis: true
        },
        {
            title: '收货维修站名称',
            dataIndex: 'receiverDealerName',
            width: 200,
            ellipsis: true
        },
        {
            title: '操作',
            dataIndex: 'operator',
            width: 80,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <span className={'pure-text-btn'} onClick={handleClickDelete.bind(null, record.code)}>删除</span>
                );
            }
        }
    ];

    return (
        <div className={styles.orders}>
            <div className="panel">
                <div className="panel-title">
                    <span>订单</span>
                </div>
                <Query />
                <Loading isLoading={isLoading}>
                    <div className="panel-content">
                        <div className={'table-wrapper'}>
                            <Table
                                columns={columns}
                                dataSource={list}
                                rowKey={'code'}
                                pagination={false}
                            />
                        </div>
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
                            showLessItems={true}
                            onShowSizeChange={doQuery}
                        />
                    </div>
                </Loading>
            </div>
        </div>
    );
}

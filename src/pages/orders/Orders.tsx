import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Pagination} from 'antd';
import moment from 'moment';
import history from '@/common/history';
import {Loading} from '@/components/loading';
import {ordersCreator} from './actions';
import styles from './Orders.module.scss';
import {Query} from './query';
import {useUtils} from '@/hooks';

export function PageOrders(props) {

    const dispatch = useDispatch();
    const {total, list, pageNo, pageSize, queryParams, isLoading} = useSelector((state: any) => {
        return state.orders.self;
    });
    const utils = useUtils();

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
            title: utils.getText('order.a4'),
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
            title: utils.getText('order.a6'),
            dataIndex: 'createdDate',
            width: 180,
            ellipsis: true,
            render(val) {
                return val && moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: utils.getText('order.a5'),
            dataIndex: 'note',
            width: 140,
            ellipsis: true
        },
        {
            title: utils.getText('order.a7'),
            dataIndex: 'statusDesc',
            width: 100,
            ellipsis: true
        },
        {
            title: utils.getText('order.a8'),
            dataIndex: 'purchaserDealerCode',
            width: 140,
            ellipsis: true
        },
        {
            title: utils.getText('order.a9'),
            dataIndex: 'purchaserDealerName',
            width: 200,
            ellipsis: true
        },
        {
            title: utils.getText('order.a10'),
            dataIndex: 'receiverDealerCode',
            width: 140,
            ellipsis: true
        },
        {
            title: utils.getText('order.a11'),
            dataIndex: 'receiverDealerName',
            width: 200,
            ellipsis: true
        },
        {
            title: utils.getText('operate.a5'),
            dataIndex: 'operator',
            width: 80,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <span className={'pure-text-btn'} onClick={handleClickDelete.bind(null, record.code)}>{utils.getText('operate.a3')}</span>
                );
            }
        }
    ];

    return (
        <div className={styles.orders}>
            <div className="panel">
                <div className="panel-title">
                    <span>{utils.getText('order.a1')}</span>
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

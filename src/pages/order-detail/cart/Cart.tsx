import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, InputNumber, Pagination} from 'antd';
import {Loading} from '@/components/loading';
import {cartCreator} from './actions';
import styles from './Cart.module.scss';
import {Query} from './query';

export function Cart(props) {

    const dispatch = useDispatch();
    const {total, list, pageNo, pageSize, queryParams, isLoading} = useSelector((state: any) => {
        return state.orders.self;
    });

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(cartCreator.doQuery(queryParams));
    }

    function handleClickOrderCode(orderCode) {
    }

    function handleClickDelete(e, orderCode) {
        e.stopPropagation();
        dispatch(cartCreator.deletePart({
            codes: [orderCode]
        }));
    }

    const columns = [
        {
            title: '零件编号',
            dataIndex: 'code',
            width: 200
        },
        {
            title: '描述',
            dataIndex: 'createdDate',
        },
        {
            title: '量',
            dataIndex: 'note',
        },
        {
            title: '最小包装数',
            dataIndex: 'statusDesc',
        },
        {
            title: '价格',
            dataIndex: 'purchaserDealerCode',
        },
        {
            title: '小计(元)',
            dataIndex: 'purchaserDealerName',
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
            <div className="box">
                <div className="box-title">
                    <span className={'title'}>商品清单</span>
                </div>
                <Query />
                <Loading isLoading={isLoading}>
                    <div className="box-content">
                        <Table
                            columns={columns}
                            dataSource={list}
                            rowKey={'code'}
                            tableLayout={'fixed'}
                            pagination={false}
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
                            showLessItems={true}
                            onShowSizeChange={doQuery}
                        />
                    </div>
                </Loading>
            </div>
        </div>
    );
}

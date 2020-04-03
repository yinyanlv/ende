import React, {useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, InputNumber, Pagination, Button} from 'antd';
import {Loading} from '@/components/loading';
import {cartCreator} from './actions';
import styles from './Cart.module.scss';
import {Query} from './query';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {useUtils} from '@/hooks';
import {NoData} from '@/components/no-data';

export function Cart(props) {

    const dispatch = useDispatch();
    const {orderCode, info} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const {total, list, pageNo, pageSize, queryParams, isLoading, selectedRecords} = useSelector((state: any) => {
        return state.orderDetail.cart.self;
    });
    const selectedKeys = selectedRecords.map((item) => {
        return item.id;
    });
    const utils = useUtils();
    const exported = isExported();
    const formRef = useRef();
    const dataRef = useRef();

    useEffect(() => {
        dataRef.current = selectedRecords;
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

    function handleClickDelete(partCode) {
        (formRef.current as any).resetFields();
        dispatch(cartCreator.deleteParts({
            orderCode,
            partCodes: [partCode]
        }));
    }

    function handleSelect(record) {
        const key = record.id;
        const curSelectedRecords: any = dataRef.current;

        const isIncluded = utils.isInclude({
            name: 'id',
            value: key
        }, curSelectedRecords);
        const rows = [...curSelectedRecords];
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

    function handleDeleteSelected() {
        const partCodes = getSelectedPartCodes();

        (formRef.current as any).resetFields();

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

    function isExported() {
        return info.statusCode === '2';
    }

    const columns = [
        {
            title: utils.getText('part.a1'),
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
            title: utils.getText('part.a2'),
            dataIndex: 'partName',
            width: 250,
            ellipsis: true
        },
        {
            title: utils.getText('part.a10'),
            dataIndex: 'qty',
            render: (val, record) => {
                if (exported) {
                    return val;
                }
                return (
                    <span onClick={utils.stopPropagation}>
                        <InputNumber value={val}
                                     min={0}
                                     step={record.unitPkgQty || 1}
                                     onChange={(val) => {
                                         try {
                                             val = parseInt(val as any);
                                             if (val >= 0) {
                                                 handleEditQty({
                                                     partCode: record.partCode,
                                                     qty: val
                                                 });
                                             }
                                         } catch(err) {
                                         }
                                     }}/>
                    </span>
                );
            }
        },
        {
            title: utils.getText('part.a3'),
            dataIndex: 'unitPkgQty'
        },
        {
            title: utils.getText('part.a6'),
            dataIndex: 'price',
            render: function (val) {
                return val && val.formatString;
            }
        },
        {
            title: utils.getText('cart.a2'),
            dataIndex: 'amount',
            render: function (val) {
                return val && val.formatString;
            }
        },
    ];

    if (!exported) {
        columns.push(
            {
                title: utils.getText('operate.a5'),
                dataIndex: 'operator',
                render: (val, record) => {
                    return (
                        <div>
                        <span className={'pure-text-btn'} onClick={(e) => {
                            e.stopPropagation();
                            handleClickDelete(record.partCode);
                        }}>{utils.getText('operate.a3')}</span>
                        </div>
                    );
                }
            }
        );
    }

    return (
        <div className={styles.cart}>
            <div className="box">
                <div className="box-title">
                    <span className={'title'}>{utils.getText('order.a29')}</span>
                </div>
                <Query isShowAdd={!exported} ref={formRef}/>
                <Loading isLoading={isLoading}>
                    <div className="box-content">
                        <Table
                            columns={columns}
                            dataSource={list}
                            rowKey={'id'}
                            tableLayout={'fixed'}
                            pagination={false}
                            locale={{
                                emptyText: <NoData/>
                            }}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        handleSelect(record);
                                    }
                                };
                            }}
                            rowSelection={!exported ?{
                                selectedRowKeys: selectedKeys,
                                onSelectAll: handleSelectAll
                            } : undefined}
                        />
                    </div>
                    <div className="pagination">
                        <div className="operators">
                            {
                                !exported &&
                                <Button onClick={handleDeleteSelected} disabled={!selectedRecords.length}>{utils.getText('operate.a3')}</Button>
                            }
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

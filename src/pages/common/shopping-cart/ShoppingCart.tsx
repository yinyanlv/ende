import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button, Form, Row, Col, Input, Table, InputNumber, Tooltip, Pagination} from 'antd';
import {shoppingCartCreator} from './actions';
import styles from './ShoppingCart.module.scss';
import {Query} from './query';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {Loading} from "@/components/loading";

export function ShoppingCart(props) {

    const dispatch = useDispatch();
    const {total, list, pageNo, pageSize, isShow, queryParams, isLoading, selectedRecords} = useSelector((state: any) => {
        return state.shoppingCart.self;
    });

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(shoppingCartCreator.doQuery(queryParams));
    }

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode
        }));
    }

    function handleClickDelete(e, partCode) {
        e.stopPropagation();
        dispatch(shoppingCartCreator.deleteFromCart({
            codes: [partCode]
        }));
    }

    function handleEditPartCartCount(partCode, qty) {
        dispatch(shoppingCartCreator.editPartCartCount({
            partCode,
            qty
        }));
    }

    function handleClose() {
        dispatch(shoppingCartCreator.setIsShowShoppingCart({
            isShow: false
        }));
    }

    function handleSelect(keys, records) {
        const rows = records.map((item) => {
            return {
                id: item.id,
                partCode: item.partCode
            }
        });
        dispatch(shoppingCartCreator.setSelectedRecords(rows));
    }

    function getSelectedPartCodes() {
        return selectedRecords.map((item) => {
            return item.partCode;
        });
    }

    function handleDeleteSelected() {
        const partCodes = getSelectedPartCodes();

        dispatch(shoppingCartCreator.deleteFromCart({
            codes: partCodes
        }));
        dispatch(shoppingCartCreator.setSelectedRecords([]));
    }

    function handleCreateOrder() {

    }

    function getModelsString(list) {
        if (!list || list.length === 0) {
            return '';
        }

        if (list.length > 5) {
            return list.slice(0, 5).map((item) => {
                return `${item.code} - ${item.name}`;
            }).join(', ');
        } else {
            return list.map((item) => {
                return `${item.code} - ${item.name}`;
            }).join(', ');
        }
    }

    const columns = [
        {
            title: '零件信息',
            dataIndex: 'partCode',
            width: 450,
            render: (val, record) => {
                const modelsString = getModelsString(record.applyList);
                return (
                    <div className="item">
                        <div className="image-box" onClick={handleClickPartCode.bind(null, record.partCode)}><img
                            src={record.coverImageUri || '/images/nopic.gif'} alt={record.partName}/></div>
                        <div className="info-box">
                            <div className="title-line">
                                <span className="btn"
                                      onClick={handleClickPartCode.bind(null, record.partCode)}>{record.partCode}</span>
                                <span className="gap">-</span>
                                <span>{record.partName}</span>
                                <span>(<span>{record.partNote}</span>)</span>
                            </div>
                            <div className="content-line">
                                <span><label>最小包装数：</label>{record.unitPkgPackage}</span>
                                <span><label>配件价格：</label>{record.price && record.price.formatString}</span>
                                <span style={{width: '100%'}}><label>适用车型：</label>{modelsString}</span>
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            title: '量',
            dataIndex: 'qty',
            render: (val, record) => {
                return (
                    <div>
                        <InputNumber defaultValue={val}
                                     onChange={handleEditPartCartCount.bind(null, record.partCode, val)}/>
                    </div>
                );
            }
        },
        {
            title: '小计(元)',
            dataIndex: 'amount',
            render: (val) => {
                return val && val.formatString;
            }
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
        <Drawer
            closable={false}
            visible={isShow}
            onClose={handleClose}
            width={850}
        >
            <div className={styles.shoppingCart}>
                <div className="drawer-title">
                    <span>购物车</span>
                </div>
                <Query/>
                <Loading isLoading={isLoading}>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={list}
                            className={list.length > 0 ? '' : 'empty-table'}
                            rowKey={'id'}
                            tableLayout={'fixed'}
                            pagination={false}
                            rowSelection={{
                                onChange: handleSelect
                            }}
                            scroll={{
                                y: styles.tableBodyHeight
                            } as any}
                        />
                    </div>
                    <div className="pagination">
                        <div className="operators">
                            <Button onClick={handleDeleteSelected} disabled={!selectedRecords.length}>删除</Button>
                            <Button type="primary" onClick={handleCreateOrder}>生成订单</Button>
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
        </Drawer>
    );
}

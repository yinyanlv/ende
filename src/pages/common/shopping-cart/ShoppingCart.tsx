import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button, Table, InputNumber, Pagination} from 'antd';
import {shoppingCartCreator} from './actions';
import styles from './ShoppingCart.module.scss';
import {Query} from './query';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {Loading} from "@/components/loading";
import {configCreator} from '@/store/config/actions';
import {useUtils} from '@/hooks';

export function ShoppingCart(props) {

    const dispatch = useDispatch();
    const {total, list, zIndex, pageNo, pageSize, isShow, queryParams, isLoading, selectedRecords} = useSelector((state: any) => {
        return state.shoppingCart.self;
    });
    const {maxZIndex, resHost} = useSelector((state: any) => {
        return state.config;
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

        dispatch(shoppingCartCreator.doQuery(queryParams));
    }

    function handleClickPartCode(e, partCode) {
        e.stopPropagation();
        const newMaxZIndex = maxZIndex + 5;
        dispatch(partDetailCreator.setIsShowPartDetail({isShow: false}));
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode,
            zIndex: newMaxZIndex
        }));
        dispatch(configCreator.setMaxZIndex({
            maxZIndex: newMaxZIndex
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
            qty,
            list
        }));
    }

    function handleClose() {
        dispatch(shoppingCartCreator.setIsShowShoppingCart({
            isShow: false
        }));
    }

    function handleSelect(record) {
        const key = record.id;
        const isIncluded = utils.isInclude({
            name: 'id',
            value: key
        }, selectedRecords);
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

        dispatch(shoppingCartCreator.setSelectedRecords(records));
    }

    function handleSelectAll(selected, _selectedRows, _changeRows) {

        if (selected) {
            const records = list.map((item) => {
                return {
                    id: item.id,
                    partCode: item.partCode
                };
            });
            dispatch(shoppingCartCreator.setSelectedRecords(records));
        } else {
            dispatch(shoppingCartCreator.setSelectedRecords([]));
        }
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

        dispatch(shoppingCartCreator.generateOrder());
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
            title: utils.getText('part.a18'),
            dataIndex: 'partCode',
            width: 450,
            render: (val, record) => {
                const modelsString = getModelsString(record.applyList);
                return (
                    <div className="item">
                        <div className="image-box" onClick={(e) => {
                            handleClickPartCode(e, record.partCode);
                        }}><img
                            src={record.coverImageUri ? resHost + record.coverImageUri : '/images/nopic.gif'} alt={record.partName}/></div>
                        <div className="info-box">
                            <div className="title-line">
                                <span className="text-btn"
                                      onClick={(e) => {
                                          handleClickPartCode(e, record.partCode);
                                      }}>{record.partCode}</span>
                                <span className="gap">-</span>
                                <span title={record.partName}>{record.partName}</span>
                                {
                                    record.partNote && <span>(<span title={record.partNote}>{record.partNote}</span>)</span>
                                }
                            </div>
                            <div className="content-line">
                                <span><label>{utils.getText('part.a3')}: </label>{record.unitPkgPackage}</span>
                                <span><label>{utils.getText('part.a6')}: </label>{record.price && record.price.formatString}</span>
                                <span className={'model'} title={modelsString}><label>{utils.getText('replace.a3')}: </label>{modelsString}</span>
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            title: utils.getText('part.a10'),
            dataIndex: 'qty',
            width: 120,
            render: (val, record) => {
                return (
                    <div onClick={utils.stopPropagation}>
                        <InputNumber value={val}
                                     min={0}
                                     max={9999}
                                     onChange={(val) => {
                                         try {
                                             val = parseInt(val as any);
                                             if (val <= 9999 && val >= 0) {
                                                 handleEditPartCartCount(record.partCode, val)
                                             }
                                         } catch(err) {
                                         }
                                     }}/>
                    </div>
                );
            }
        },
        {
            title: utils.getText('cart.a2'),
            dataIndex: 'amount',
            width: 120,
            render: (val) => {
                return val && val.formatString;
            }
        },
        {
            title: utils.getText('operate.a5'),
            width: 100,
            dataIndex: 'operator',
            render: (val, record) => {
                return (
                    <div>
                        <span className={'pure-text-btn'} onClick={(e) => {
                            handleClickDelete(e, record.partCode);
                        }}>{utils.getText('operate.a3')}</span>
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
            zIndex={zIndex}
        >
            <div className={styles.shoppingCart}>
                <div className="drawer-title">
                    <span>{utils.getText('cart.a1')}</span>
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
                            scroll={{
                                y: styles.tableBodyHeight
                            } as any}
                        />
                    </div>
                    <div className="pagination">
                        <div className="operators">
                            <Button onClick={handleDeleteSelected} disabled={!selectedRecords.length}>{utils.getText('operate.a3')}</Button>
                            <Button type="primary" disabled={!list.length} onClick={handleCreateOrder}>{utils.getText('order.a3')}</Button>
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

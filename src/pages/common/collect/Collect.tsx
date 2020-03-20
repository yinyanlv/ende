import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button, Table, Pagination} from 'antd';
import {collectCreator} from './actions';
import styles from './Collect.module.scss';
import {Query} from './query';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {Loading} from "@/components/loading";

export function Collect(props) {

    const dispatch = useDispatch();
    const {total, list, pageNo, pageSize, isShow, queryParams, isLoading, selectedRecords} = useSelector((state: any) => {
        return state.collect.self;
    });

    function doQuery(page, size) {
        queryParams.paging = {
            page,
            size
        };

        dispatch(collectCreator.doQuery(queryParams));
    }

    function handleClickPartCode(partCode) {
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode
        }));
    }

    function handleClickDelete(e, partCode) {
        e.stopPropagation();
        dispatch(collectCreator.deleteFromCollect({
            codes: [partCode]
        }));
    }

    function handleClickEdit(e, partCode) {
        e.stopPropagation();
        dispatch(collectCreator.deleteFromCollect({
            codes: [partCode]
        }));
    }

    function handleClose() {
        dispatch(collectCreator.setIsShowCollect({
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
        dispatch(collectCreator.setSelectedRecords(rows));
    }

    function getSelectedPartCodes() {
        return selectedRecords.map((item) => {
            return item.partCode;
        });
    }

    function handleDeleteSelected() {
        const partCodes = getSelectedPartCodes();

        dispatch(collectCreator.deleteFromCollect({
            codes: partCodes
        }));
        dispatch(collectCreator.setSelectedRecords([]));
    }


    const columns = [
        {
            title: '收藏名称',
            dataIndex: 'partCode',
            width: 550,
            render: (val, record) => {
                return (
                    <div className="item">
                        <div className="image-box" onClick={handleClickPartCode.bind(null, record.partCode)}><img
                            src={record.coverImageUri || '/images/no_pic.png'} alt={record.partName}/></div>
                        <div className="info-box">
                            <div className="title-line">
                                <span>收藏的名称</span>
                            </div>
                            <div className="content-line">
                                <span>1 -配件价格</span>
                            </div>
                            <div className="date-line">
                                <span>2017-11-11 22:11:11</span>
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            title: '操作',
            dataIndex: 'operator',
            render: (val, record) => {
                return (
                    <div className="btns">
                        <span className={'pure-text-btn'} onClick={(e) => {
                            handleClickEdit(e, record.partCode);
                        }}>编辑</span>
                        <span className={'pure-text-btn'} onClick={(e) => {
                            handleClickDelete(e, record.partCode);
                        }}>删除</span>
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
            <div className={styles.collect}>
                <div className="drawer-title">
                    <span>收藏</span>
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

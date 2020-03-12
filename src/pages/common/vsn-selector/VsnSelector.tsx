import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Table} from 'antd';
import {vsnSelectorCreator} from './actions';
import {vinSearchCreator} from '@/pages/common/vin-search/actions';
import {queryCreator} from '@/pages/common/search/advance-search/query/actions';
import styles from './VsnSelector.module.scss';

export function VsnSelector() {
    const dispatch = useDispatch();
    const {isShow, list, vsnCode, doNotRedirect, advanceSearchParams, zIndex} = useSelector((state: any) => {
        return state.vsnSelector;
    });

    function handleClickRow(record) {

        if (advanceSearchParams) {
            advanceSearchParams.filters.push({
                name: 'vsnModel',
                value: record.modelId
            });

            dispatch(queryCreator.doQuery(advanceSearchParams));
            handleClose();
        } else {
            dispatch(vinSearchCreator.doVsnSearch({
                code: vsnCode,
                model: record.modelId,
                doNotRedirect
            }));
        }
    }

    function handleClose() {
        dispatch(vsnSelectorCreator.setIsShowVsnSelector({
            isShow: false,
            list: []
        }));
    }

    const columns = [
        {
            title: '车型',
            dataIndex: 'model'
        },
        {
            title: '目录',
            dataIndex: 'catalog'
        },
        {
            title: '开始时间',
            dataIndex: 'beginDate'
        },
        {
            title: '结束时间',
            key: 'endDate'
        }
    ];

    return (
        <Drawer
            closable={false}
            visible={isShow}
            onClose={handleClose}
            destroyOnClose={true}
            width={500}
            zIndex={zIndex}
        >
            <div className={styles.vsnSelector}>
                <div className="drawer-title">
                    <span>VIN/VSN详情</span>
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={list}
                        rowKey={'modelId'}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    handleClickRow(record);
                                }
                            }
                        }}
                        scroll={{
                            y: styles.tableBodyHeight
                        } as any}
                        pagination={false}
                    />
                </div>
            </div>
        </Drawer>
    );
}

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Table} from 'antd';
import {vsnSelectorCreator} from './actions';
import {vinSearchCreator} from '@/pages/common/vin-search/actions';
import {queryCreator} from '@/pages/common/search/advance-search/query/actions';
import styles from './VsnSelector.module.scss';
import {useUtils} from '@/hooks';

export function VsnSelector() {
    const dispatch = useDispatch();
    const {isShow, list, vsnCode, doNotRedirect, advanceSearchParams, zIndex} = useSelector((state: any) => {
        return state.vsnSelector;
    });
    const utils = useUtils();

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
            title: utils.getText('part.a11'),
            dataIndex: 'model'
        },
        {
            title: utils.getText('applicability.a2'),
            dataIndex: 'catalog'
        },
        {
            title: utils.getText('vin.a2'),
            dataIndex: 'beginDate'
        },
        {
            title: utils.getText('vin.a3'),
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
                    <span>{utils.getText('vin.a1')}</span>
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

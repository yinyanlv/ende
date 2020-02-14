import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Table} from 'antd';
import {vsnSelectorCreator} from './actions';
import {vinSearchCreator} from '@/pages/common/vin-search/actions';
import styles from './VsnSelector.module.scss';

export function VsnSelector() {
    const dispatch = useDispatch();
    const {isShow, list} = useSelector((state: any) => {
        return state.vsnSelector;
    });

    function handleClickRow(record) {
        dispatch(vinSearchCreator.doVsnSearch({
            code: record.code,
            model: record.name
        }));
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
        >
            <div className={styles.vsnSelector}>
                <div className="drawer-title">
                    <span>VIN/VSN详情</span>
                </div>
                <div>
                    <Table
                        columns={columns}
                        dataSource={list}
                        onRowClick={handleClickRow}
                        pagination={false}
                    />
                </div>
            </div>
        </Drawer>
    );
}

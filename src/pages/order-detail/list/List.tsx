import React from 'react';
import {Modal, Table, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '@/components/loading';
import styles from './List.module.scss';
import {listCreator} from './actions';
import {editCreator} from '../edit/actions';
import {useUtils} from '@/hooks';

export function List() {
    const dispatch = useDispatch();
    const {isShow, type, isLoading, list, selectedKeys} = useSelector((state: any) => {
        return state.orderDetail.list;
    });
    const utils = useUtils();
    const title = type === 'purchase' ? '下单人信息' : '收货人信息';

    function handleClickDelete(e, record) {
        e.stopPropagation();
        dispatch(listCreator.deleteRecord({
            id: record.id,
            type
        }));
    }

    function handleClickEdit(e, record) {
        e.stopPropagation();
        dispatch(editCreator.setIsShowEdit({
            isShow: true,
            mode: 'edit',
            type,
            fieldsValue: record
        }));
    }

    function handleClickCreate() {
        dispatch(editCreator.setIsShowEdit({
            isShow: true,
            type
        }));
    }

    function setDefault(record) {
        dispatch(listCreator.setDefault(Object.assign({}, record, {type})));
    }

    function handleCancel() {
        dispatch(listCreator.setIsShowList({
            isShow: false
        }));
    }

    const columns = [
        {
            title: '地址别名',
            dataIndex: 'name',
            width: 100,
            ellipsis: true,
        },
        {
            title: '地址',
            width: 180,
            ellipsis: true,
            dataIndex: 'address'
        },
        {
            title: '邮编',
            dataIndex: 'postcode',
            width: 80,
            ellipsis: true
        },
        {
            title: '配件员',
            width: 100,
            ellipsis: true,
            dataIndex: 'contact'
        },
        {
            title: '配件员电话',
            width: 120,
            ellipsis: true,
            dataIndex: 'phone'
        },
        {
            title: '电子邮件',
            width: 140,
            ellipsis: true,
            dataIndex: 'mail'
        },
        {
            title: '操作',
            width: 120,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <div>
                        <span className={'pure-text-btn'} onClick={(e) => {
                            handleClickEdit(e, record);
                        }}>编辑</span>
                        <span className={'pure-text-btn'} onClick={(e) => {
                            handleClickDelete(e, record);
                        }}>删除</span>
                    </div>
                );
            }
        }
    ];

    return (
        <Modal
            visible={isShow}
            title={title}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
            width={950}
            className={styles.list}
        >
            <Loading isLoading={isLoading}>
                <div className={'operators-line'}>
                    <Button type={'primary'} onClick={handleClickCreate}>{utils.getText('operate.a1')}</Button>
                </div>
                <div className={styles.list}>
                    <Table
                        columns={columns}
                        dataSource={list}
                        className={list.length > 0 ? '' : 'empty-table'}
                        pagination={false}
                        rowKey={'id'}
                        tableLayout={'fixed'}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    setDefault(record);
                                }
                            }
                        }}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: selectedKeys
                        }}
                    />
                </div>
            </Loading>
        </Modal>
    );
}

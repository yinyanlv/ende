import React from 'react';
import {Modal, Table, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '@/components/loading';
import styles from './List.module.scss';
import {listCreator} from './actions';

export function List() {
    const dispatch = useDispatch();
    const {isShow, isLoading, list, selectedKeys} = useSelector((state: any) => {
        return state.orderDetail.purchaser.list;
    });


    function handleClickDelete(e, record) {
        e.stopPropagation();
        dispatch(listCreator.deleteRecord({
            id: record.id
        }));
    }

    function handleClickEdit(e, record) {
        e.stopPropagation();
    }

    function handleClickCreate() {

    }

    function setDefault(record) {
        dispatch(listCreator.setDefault({
            id: record.id
        }));
    }

    function handleOk() {

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
            width: 120,
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
            dataIndex: 'postCode',
            width: 80,
            ellipsis: true
        },
        {
            title: '配件员',
            width: 120,
            ellipsis: true,
            dataIndex: 'dealerName'
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
            width: 140,
            ellipsis: true,
            render: (val, record) => {
                return (
                    <div>
                        <a className={'text-btn'} onClick={(e) => {
                            handleClickEdit(e, record);
                        }}>编辑</a>
                        <a className={'text-btn'} onClick={(e) => {
                            handleClickDelete(e, record);
                        }}>删除</a>
                    </div>
                );
            }
        }
    ];

    return (
        <Modal
            visible={isShow}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
            width={800}
        >
            <Loading isLoading={isLoading}>
                <div>
                    <Button type={'primary'} onClick={handleClickCreate}>新增</Button>
                </div>
                <div className={styles.list}>
                    <Table
                        columns={columns}
                        dataSource={list}
                        className={list.length > 0 ? '' : 'empty-table'}
                        pagination={false}
                        rowKey={'id'}
                        tableLayout={'fixed'}
                        // rowSelection={{
                        //     onSelect: (record) => {
                        //         handleSelect(record);
                        //     }
                        // }}
                    />
                </div>
            </Loading>
        </Modal>
    );
}

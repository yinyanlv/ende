import React, {useEffect, useRef} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'antd';
import styles from './OrderDetail.module.scss';
import {Info} from './info';
import {Purchaser} from './purchaser';
import {Cart} from './cart';
import {orderDetailCreator} from './actions';
import {Receiver} from './receiver';
import {ImportFile} from './import-file';
import {importFileCreator} from './import-file/actions';
import {List} from './list';
import {Edit} from './edit';

export function PageOrderDetail() {
    const dispatch = useDispatch();
    const match: any = useRouteMatch();
    const infoFormRef = useRef();

    const {orderCode, info} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const purchaserInfo = useSelector((state: any) => {
        return state.orderDetail.purchaser.info;
    });
    const receiverInfo = useSelector((state: any) => {
        return state.orderDetail.receiver.info;
    });

    useEffect(() => {
        dispatch(orderDetailCreator.initOrderDetail({
            orderCode: match.params.id
        }));
    }, []);

    function saveAsNewOrder() {
       dispatch(orderDetailCreator.saveAsNewOrder({
           orderCode
       }));
    }

    function deleteOrder() {
        dispatch(orderDetailCreator.deleteOrder({
            orderCode
        }));
    }

    function saveOrder() {
        const fieldsValue = (infoFormRef.current as any).getFieldsValue();
        const params = Object.assign({}, info, fieldsValue, {
            purchaser: purchaserInfo,
            receiver: receiverInfo
        });
        dispatch(orderDetailCreator.saveOrder(params));
    }

    function exportOrder() {
        dispatch(orderDetailCreator.exportOrder({
            orderCode
        }));
    }

    function importOrder() {
        dispatch(importFileCreator.setIsShow({
            isShow: true
        }));
    }
    return (
        <div className={styles.orderDetail}>
            <div className="panel">
                <div className="panel-title">
                    <div className={'title-wrapper'}>
                        <span className={'title'}>订单: {info.code}</span>
                        <span className={'separator'}>/</span>
                        <span className={'status'}>状态：{info.statusDesc}</span>
                    </div>
                    <div className={'btns'}>
                        <Button type={'primary'} onClick={saveAsNewOrder}>另存为新订单</Button>
                        <Button type={'primary'} onClick={exportOrder}>导出订单</Button>
                        <Button type={'primary'} onClick={deleteOrder}>删除订单</Button>
                        <Button type={'primary'} onClick={saveOrder}>保存订单</Button>
                        <Button type={'primary'} onClick={importOrder}>导入订单</Button>
                    </div>
                    <ImportFile/>
                </div>
                <div className="panel-content">
                    <Info ref={infoFormRef}/>
                    <Purchaser/>
                    <Receiver/>
                    <Cart/>
                </div>
            </div>
            <List/>
            <Edit/>

        </div>
    );
}


import React, {useEffect, useRef} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button, message} from 'antd';
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
import {useUtils} from '@/hooks';

export function PageOrderDetail() {
    const dispatch = useDispatch();
    const match: any = useRouteMatch();
    const infoFormRef = useRef();
    const utils = useUtils();

    const {orderCode, info} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const purchaserInfo = useSelector((state: any) => {
        return state.orderDetail.purchaser.info;
    });
    const receiverInfo = useSelector((state: any) => {
        return state.orderDetail.receiver.info;
    });
    const exported = isExported();

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
        message.success(utils.getText('msg.a8'));
        setTimeout(() => {
            dispatch(orderDetailCreator.initOrderDetail({
                orderCode
            }));
        }, 1000);
    }

    function importOrder() {
        dispatch(importFileCreator.setIsShow({
            isShow: true
        }));
    }

    function isExported() {
        return info.statusCode === '2';
    }

    return (
        <div className={styles.orderDetail}>
            <div className="panel">
                <div className="panel-title">
                    <div className={'title-wrapper'}>
                        <span className={'title'}>{utils.getText('order.a2')}: {info.code}</span>
                        <span className={'separator'}>/</span>
                        <span className={'status'}>{utils.getText('order.a7')}：{info.statusDesc}</span>
                    </div>
                    <div className={'btns'}>
                        <Button type={'primary'} onClick={saveAsNewOrder}>{utils.getText('order.a30')}</Button>
                        <Button type={'primary'} onClick={exportOrder}>{utils.getText('order.a31')}</Button>
                        <Button type={'primary'} onClick={deleteOrder}>{utils.getText('order.a32')}</Button>
                        {
                            !exported && (
                                <>
                                    <Button type={'primary'} onClick={saveOrder}>{utils.getText('order.a33')}</Button>
                                    <Button type={'primary'} onClick={importOrder}>{utils.getText('order.a35')}</Button>
                                </>
                            )
                        }
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


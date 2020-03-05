import React, {useEffect} from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'antd';
import styles from './OrderDetail.module.scss';
import {Info} from './info';
import {Purchaser} from './purchaser';
import {Cart} from './cart';
import {orderDetailCreator} from './actions';


export function PageOrderDetail() {
    const dispatch = useDispatch();
    const match: any = useRouteMatch();

    const {orderCode, info} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const purchaserInfo = useSelector((state: any) => {
        return state.orderDetail.purchaser.info;
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
        dispatch(orderDetailCreator.saveAsNewOrder({
            orderCode
        }));
    }

    function saveOrder() {
        const params = Object.assign({}, info, {
            purchaser: purchaserInfo
        });
        dispatch(orderDetailCreator.saveOrder(params));
    }

    function exportOrder() {
        dispatch(orderDetailCreator.exportOrder({
            orderCode
        }));
    }

    function importOrder() {

    }

    return (
        <div className={styles.orderDetail}>
            <div className="panel">
                <div className="panel-title">
                    <div className={'title-wrapper'}>
                        <span className={'title'}>订单</span>
                    </div>
                    <div className={'btns'}>
                        <Button type={'primary'} onClick={saveAsNewOrder}>另存为新订单</Button>
                        <Button type={'primary'} onClick={exportOrder}>导出订单</Button>
                        <Button type={'primary'} onClick={deleteOrder}>删除订单</Button>
                        <Button type={'primary'} onClick={saveOrder}>保存订单</Button>
                        <Button type={'primary'}>导入订单</Button>
                    </div>
                </div>
                <div className="panel-content">
                    <Info/>
                    <Purchaser/>
                    <Cart/>
                </div>
            </div>
        </div>
    );
}


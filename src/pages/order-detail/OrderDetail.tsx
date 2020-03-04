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

    useEffect(() => {
        dispatch(orderDetailCreator.initOrderDetail({
            orderCode: match.params.id
        }));
    }, []);

    return (
        <div className={styles.orderDetail}>
            <div className="panel">
                <div className="panel-title">
                    <div className={'title-wrapper'}>
                        <span className={'title'}>订单</span>
                    </div>
                    <div className={'btns'}>
                        <Button type={'primary'}>另存为新订单</Button>
                        <Button type={'primary'}>导出订单</Button>
                        <Button type={'primary'}>删除订单</Button>
                        <Button type={'primary'}>保存订单</Button>
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


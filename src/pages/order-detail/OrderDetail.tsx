import React from 'react';
import styles from './OrderDetail.module.scss';
import {Info} from './info';
import {Logistics} from './logistics';
import {Cart} from './cart';
import {Button} from 'antd';

export function PageOrderDetail() {
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
                    <Logistics/>
                    <Cart/>
                </div>
            </div>
        </div>
    );
}


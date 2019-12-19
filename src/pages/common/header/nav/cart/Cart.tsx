import React from 'react';
import {Skeleton, Button, InputNumber, Icon} from 'antd';
import styles from './Cart.module.scss';

function Cart(props) {

    function handleInputChange() {
        console.log(arguments);
    }

    return (
        <div className={styles.cart}>
            <Skeleton active={true} loading={false}>
                <div className={'cart-panel'}>
                    <div className={'header'}>
                        <span>购物车</span>
                    </div>
                    <div className={'content'}>
                        <ul className={'cart-list'}>
                            <li>
                                <div className={'part-box'}>
                                    <span className={'part-code'}>23890811</span>
                                    <span className={'part-name'}>行李托架安装支架螺母</span>
                                </div>
                                <div className={'input-box'}>
                                    <InputNumber min={0} defaultValue={0} step={5} onChange={handleInputChange} />
                                </div>
                                <div className={'btn-box'}>
                                    <span><Icon type="delete" /></span>
                                </div>
                            </li>
                            <li>
                                <div className={'part-box'}>
                                    <span className={'part-code'}>23890811</span>
                                    <span className={'part-name'}>行李托架安装支架螺母</span>
                                </div>
                                <div className={'input-box'}>
                                    <InputNumber min={0} defaultValue={0} step={5} onChange={handleInputChange} />
                                </div>
                                <div className={'btn-box'}>
                                    <span><Icon type="delete" /></span>
                                </div>
                            </li>
                            <li>
                                <div className={'part-box'}>
                                    <span className={'part-code'}>23890811</span>
                                    <span className={'part-name'}>行李托架安装支架螺母</span>
                                </div>
                                <div className={'input-box'}>
                                    <InputNumber min={0} defaultValue={0} step={5} onChange={handleInputChange} />
                                </div>
                                <div className={'btn-box'}>
                                    <span><Icon type="delete" /></span>
                                </div>
                            </li>
                            <li>
                                <div className={'part-box'}>
                                    <span className={'part-code'}>23890811</span>
                                    <span className={'part-name'}>行李托架安装支架螺母</span>
                                </div>
                                <div className={'input-box'}>
                                    <InputNumber min={0} defaultValue={0} step={5} onChange={handleInputChange} />
                                </div>
                                <div className={'btn-box'}>
                                    <span><Icon type="delete" /></span>
                                </div>
                            </li>
                            <li>
                                <div className={'part-box'}>
                                    <span className={'part-code'}>23890811</span>
                                    <span className={'part-name'}>行李托架安装支架螺母</span>
                                </div>
                                <div className={'input-box'}>
                                    <InputNumber min={0} defaultValue={0} step={5} onChange={handleInputChange} />
                                </div>
                                <div className={'btn-box'}>
                                    <span><Icon type="delete" /></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={'footer'}>
                        <Button type="primary" icon="shopping-cart">去购物车结算</Button>
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}

export default React.memo(Cart);

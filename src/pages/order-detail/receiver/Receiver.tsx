import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import cls from 'classnames';
import {listCreator} from '../list/actions';
import styles from './Receiver.module.scss';
import {useUtils} from '@/hooks';

export function Receiver() {
    const dispatch = useDispatch();
    const {info} = useSelector((state: any) => {
        return state.orderDetail.receiver;
    });
    const detailInfo = useSelector((state: any) => {
        return state.orderDetail.self.info;
    });
    const exported = isExported();
    const utils = useUtils();
    const lang = utils.getLang();

    function handleClickEdit() {
        dispatch(listCreator.setIsShowList({
            isShow: true,
            type: 'receiver'
        }));
        dispatch(listCreator.loadList({
            type: 'receiver'
        }));
    }

    function isExported() {
        return detailInfo.statusCode === '2';
    }

    return (
        <div className={cls([styles.receiver, 'box'])}>
            <div className={'box-title'}>
                    <span className={'title'}>
                        {utils.getText('order.a28')}
                    </span>
                {
                    !exported && <span className={'btn-edit'} onClick={handleClickEdit}><EditOutlined/> {utils.getText('order.a39')}</span>
                }
            </div>
            <div className={'box-content'}>
                <Row className={lang.startsWith('en') ? 'info en' : 'info'}>
                    <Col span={6}>
                        <label className={'item-label'}>{utils.getText('order.a21')}:</label>{info.dealerCode}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>{utils.getText('order.a22')}:</label>{info.dealerName}
                    </Col>
                    <Col span={24}>
                        <label className={'item-label'}>{utils.getText('order.a23')}:</label>{info.address}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>{utils.getText('order.a24')}:</label>{info.postcode}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>{utils.getText('order.a25')}:</label>{info.contact}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>{utils.getText('order.a26')}:</label>{info.phone}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>{utils.getText('order.a27')}:</label>{info.mail}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import cls from 'classnames';
import {listCreator} from './list/actions';
import styles from './Purchaser.module.scss';
import {List} from './list';

export function Purchaser() {
    const dispatch = useDispatch();
    const {info} = useSelector((state: any) => {
        return state.orderDetail.purchaser.self;
    });

    function handleClickEdit() {
         dispatch(listCreator.setIsShowList({
             isShow: true
         }));
         dispatch(listCreator.loadList());
    }

    return (
        <div className={cls([styles.purchaser, 'box'])}>
            <div className={'box-title'}>
                    <span className={'title'}>
                        下单人信息
                    </span>

                <span className={'btn-edit'} onClick={handleClickEdit}><EditOutlined/> 修改或使用新地址</span>
            </div>
            <div className={'box-content'}>
                <Row className={'info'}>
                    <Col span={6}>
                        <label className={'item-label'}>维修站编码:</label>{info.dealerCode}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>维修站名称:</label>{info.dealerName}
                    </Col>
                    <Col span={24}>
                        <label className={'item-label'}>地址:</label>{info.address}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>邮编:</label>{info.postcode}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>配件员:</label>{info.cantact}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>配件员电话:</label>{info.phone}
                    </Col>
                    <Col span={6}>
                        <label className={'item-label'}>电子邮件:</label>{info.mail}
                    </Col>
                </Row>
            </div>
            <List/>
        </div>
    )
}

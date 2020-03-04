import React from 'react';
import {Row, Col} from 'antd';
import cls from 'classnames';
import styles from './Purchaser.module.scss';

export function Purchaser() {

    return (
        <div className={cls([styles.purchase, 'box'])}>
            <div className={'box-title'}>
                    <span className={'title'}>
                        人信息
                    </span>
            </div>
            <div className={'box-content'}>
                <Row className={'info'}>
                    <Col span={8}>
                        <label className={'item-label'}>维修站编码:</label>232939393
                    </Col>
                    <Col span={16}>
                        <label className={'item-label'}>维修站名称:</label>232939393
                    </Col>
                    <Col span={24}>
                        <label className={'item-label'}>地址:</label>232939393
                    </Col>
                    <Col span={8}>
                        <label className={'item-label'}>邮编:</label>232939393
                    </Col>
                    <Col span={8}>
                        <label className={'item-label'}>配件员:</label>232939393
                    </Col>
                    <Col span={8}>
                        <label className={'item-label'}>配件员电话:</label>232939393
                    </Col>
                    <Col span={8}>
                        <label className={'item-label'}>电子邮件:</label>232939393
                    </Col>
                </Row>
            </div>
        </div>
    )
}

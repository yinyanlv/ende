import React from 'react';
import {Button, Form, Input, Row, Col, Select} from 'antd';
import styles from './Info.module.scss';

const FormItem = Form.Item;
const Option = Select.Option;

export function Info() {
    const [form] = Form.useForm();
    const orderTypeList: any = [];

    return (
        <div className={styles.info}>
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
            >
                <Row>
                    <Col span={6}>
                        <FormItem label="运输方式" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="订单类型" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="销售组织" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="分销渠道" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="产品组" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="工厂" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="计划编码" name={'legendGroupCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    orderTypeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="订单备注" name={'legendGroupCode'}>
                            <Input placeholder={'请输入'}/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

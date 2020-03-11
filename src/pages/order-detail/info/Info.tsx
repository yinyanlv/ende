import React, {useEffect, forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Input, Row, Col, Select} from 'antd';
import {infoCreator} from './actions';
import styles from './Info.module.scss';

const FormItem = Form.Item;
const Option = Select.Option;

function InnerInfo(props, parentRef) {
    const dispatch = useDispatch();
    const {
        fieldsValue,
        transportList,
        typeList,
        organizationList,
        channelList,
        productGroupList,
        factoryList,
        planningList
    } = useSelector((state: any) => {
        return state.orderDetail.info;
    });
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(infoCreator.loadTransport());
        dispatch(infoCreator.loadType());
        dispatch(infoCreator.loadOrganization());
        dispatch(infoCreator.loadChannel());
        dispatch(infoCreator.loadProductGroup());
        dispatch(infoCreator.loadFactory());
        dispatch(infoCreator.loadPlanning());
    }, []);

    useEffect(() => {
        if (Object.keys(fieldsValue).length) {
            form.setFieldsValue(fieldsValue);
        }
    }, [fieldsValue]);

    return (
        <div className={styles.info}>
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
                initialValues={fieldsValue}
                ref={parentRef}
            >
                <Row>
                    <Col span={6}>
                        <FormItem label="运输方式" name={'transportCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    transportList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="订单类型" name={'typeCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    typeList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="销售组织" name={'organizationCode'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    organizationList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="分销渠道" name={'channel'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    channelList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="产品组" name={'productGroup'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    productGroupList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="工厂" name={'factory'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    factoryList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="计划编码" name={'planning'}>
                            <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                {
                                    planningList.map((item) => {
                                        return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label="订单备注" name={'note'}>
                            <Input placeholder={'请输入'} style={{width: 155}}/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Info = forwardRef(InnerInfo);

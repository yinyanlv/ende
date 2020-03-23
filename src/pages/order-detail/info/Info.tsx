import React, {useEffect, forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Input, Row, Col, Select} from 'antd';
import {infoCreator} from './actions';
import styles from './Info.module.scss';
import {useUtils} from '@/hooks';

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
    const utils = useUtils();

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
                        <FormItem label={utils.getText('order.a12')} name={'transportCode'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    transportList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a13')} name={'typeCode'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    typeList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a14')} name={'organizationCode'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    organizationList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a15')} name={'channel'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    channelList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a16')} name={'productGroup'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    productGroupList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a17')} name={'factory'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    factoryList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a19')} name={'planning'}>
                            <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
                                {
                                    planningList.map((item) => {
                                        return <Option key={item.code} title={item.name} value={item.code}>{item.name}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={utils.getText('order.a5')} name={'note'}>
                            <Input placeholder={utils.getText('app.a2')} style={{width: 155}}/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Info = forwardRef(InnerInfo);

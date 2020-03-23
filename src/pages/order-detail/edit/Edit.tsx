import React, {useEffect} from 'react';
import {Modal, Form, Row, Col, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Edit.module.scss';
import {editCreator} from './actions';
import {useUtils} from '@/hooks';

const FormItem = Form.Item;

export function Edit() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {isShow, fieldsValue, mode, type} = useSelector((state: any) => {
        return state.orderDetail.edit;
    });
    const utils = useUtils();

    function handleOk() {
        form.validateFields().then((params) => {
            params.id = fieldsValue.id || '';
            dispatch(editCreator.editRecord(Object.assign({}, params, {
                type
            })));
        }).catch((err) => {
        });
    }

    function handleCancel() {
        dispatch(editCreator.setIsShowEdit({
            isShow: false,
            mode: mode
        }));
    }

    const title = type === 'purchaser' ? utils.getText('order.a41') : utils.getText('order.a42');

    useEffect(() => {
       form.resetFields();
       form.setFieldsValue(fieldsValue);
    }, [isShow]);

    return (
        <Modal
            visible={isShow}
            title={mode === 'edit' ? `${title}-${utils.getText('operate.a2')}` : `${title}-${utils.getText('operate.a1')}`}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            okText='保存'
            cancelText='取消'
            destroyOnClose={true}
            className={styles.edit}
        >
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
            >
                <Row>
                    <Col span={24}>
                        <div className={'guide-line'}>
                            <FormItem label={utils.getText('order.a40')} name={'name'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                                <Input placeholder={utils.getText('app.a2')}/>
                            </FormItem>
                            <span className={'text'}>({utils.getText('order.a43')} )</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <FormItem label={utils.getText('order.a21')} name={'dealerCode'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={24} className={'long-width'}>
                        <FormItem label={utils.getText('order.a22')} name={'dealerName'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={24} className={'long-width'}>
                        <FormItem label={utils.getText('order.a23')} name={'address'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label={utils.getText('order.a24')} name={'postcode'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label={utils.getText('order.a25')} name={'contact'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label={utils.getText('order.a26')} name={'phone'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label={utils.getText('order.a27')} name={'mail'} rules={[{required: true, message:`${utils.getText('app.a2')}`}]}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

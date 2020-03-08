import React from 'react';
import {Modal, Form, Row, Col, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Edit.module.scss';
import {editCreator} from './actions';

const FormItem = Form.Item;

export function Edit() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {isShow, fieldsValue, mode, type} = useSelector((state: any) => {
        return state.orderDetail.edit;
    });

    function handleOk() {
        form.validateFields().then((params) => {
            params.id = fieldsValue.id || '';
            dispatch(editCreator.editRecord(params));
        }).catch((err) => {
        });
    }

    function handleCancel() {
        dispatch(editCreator.setIsShowEdit({
            isShow: false,
            fieldsValue: {}
        }));
    }

    const title = type === 'purchaser' ? '下单人' : '收货人';

    return (
        <Modal
            visible={isShow}
            title={mode === 'edit' ? `${title}-编辑` : `${title}-新增`}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            okText='保存'
            cancelText='取消'
            destroyOnClose={true}
        >
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
                initialValues={fieldsValue}
                className={styles.edit}
            >
                <Row>
                    <Col span={24}>
                        <div className={'guide-line'}>
                            <FormItem label="地址别名" name={'name'} rules={[{required: true, message:'请填写地址别名'}]}>
                                <Input placeholder="请输入"/>
                            </FormItem>
                            <span className={'text'}>(使用易记的名称帮助您区别不同的收货地址 )</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <FormItem label="维修站编码" name={'dealerCode'} rules={[{required: true, message:'请填写维修站编码'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={24} className={'long-width'}>
                        <FormItem label="维修站名称" name={'dealerName'} rules={[{required: true, message:'请填写维修站名称'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={24} className={'long-width'}>
                        <FormItem label="地址" name={'address'} rules={[{required: true, message:'请填写地址'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="邮编" name={'postcode'} rules={[{required: true, message:'请填写邮编'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="配件员" name={'contact'} rules={[{required: true, message:'请填写配件员'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="配件员电话" name={'phone'} rules={[{required: true, message:'请填写配件员电话'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="电子邮件" name={'mail'} rules={[{required: true, message:'请填写电子邮件'}]}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

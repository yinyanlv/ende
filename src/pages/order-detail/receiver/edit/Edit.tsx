import React from 'react';
import {Modal, Button, Form, Row, Col, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import styles from './edit.module.scss';
import {editCreator} from './actions';

const FormItem = Form.Item;

export function Edit() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {isShow, fieldsValue} = useSelector((state: any) => {
        return state.orderDetail.purchaser.edit;
    });

    function handleClickEdit(e, record) {
        e.stopPropagation();
    }

    function handleClickCreate() {
    }

    function handleOk() {

    }

    function handleCancel() {

    }

    return (
        <Modal
            visible={isShow}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
                initialValues={fieldsValue}
            >
                <Row>
                    <Col span={8}>
                            <FormItem label="VIN/VSN" name={'vinVsn'}>
                                <Input placeholder="请输入"/>
                            </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例编号" name={'legendCode'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例描述" name={'legendName'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label="图例备注" name={'legendNote'}>
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件编号" name={'partCode'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件描述" name={'partName'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

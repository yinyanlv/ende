import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Col, Form, Input, Row} from 'antd';
import {buildQueryParams} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';

const FormItem = Form.Item;

export function QueryForm(props: any) {
    const dispatch = useDispatch();
    const {getFieldDecorator} = props.form;

    function doQuery() {
       props.form.validateFields((err, values) => {
           if (!err) {
               const params = buildQueryParams(values);
               dispatch(queryCreator.doQuery(params));
           }
       });
    }

    function doReset() {
        props.form.resetFields();
    }

    return (
        <div className="query">
            <Form layout="inline" labelAlign="left">
                <Row>
                    <Col span={8}>
                        <FormItem label="收藏类型">
                            {
                                getFieldDecorator('partCode', {})(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="收藏名称">
                            {
                                getFieldDecorator('partCode', {})(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8} className="inner-btn-line">
                        <Button type="primary" onClick={doQuery}>查询</Button>
                        <Button onClick={doReset}>清空</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Query = Form.create()(QueryForm);

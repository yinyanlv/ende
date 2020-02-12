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
        <div className={styles.query}>
            <Form layout="inline" labelAlign="left">
                <Row>
                    <Col span={8}>
                        <FormItem label="零件编号">
                            {
                                getFieldDecorator('partCode', {})(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit" onClick={doQuery}>搜索</Button>
                        <Button style={{marginLeft: 8}} onClick={doReset}>清空</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Query = Form.create()(QueryForm);

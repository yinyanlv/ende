import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message, Button, Col, Form, Input, Row} from 'antd';
import {rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';

const FormItem = Form.Item;

export function QueryForm(props: any) {
    const dispatch = useDispatch();
    const {getFieldDecorator} = props.form;
    const {fieldsValue} = useSelector((state: any) => {
        return state.search.replace.query;
    });

    function doQuery() {
       props.form.validateFields((err, values) => {
           if (!err) {
               const filters = rebuildFieldsToFilters(values);

               if (filters.length > 0) {
                   dispatch(queryCreator.doQuery(values));
               } else {
                   message.error('请输入零件编号');
               }
           }
       });
    }

    function doReset() {
        props.form.resetFields();
    }

    return (
        <div className={'query'}>
            <Form layout="inline" labelAlign="left">
                <Row>
                    <Col span={8}>
                        <FormItem label="零件编号">
                            {
                                getFieldDecorator('partCode', {
                                    initialValue: fieldsValue.partCode
                                })(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={16} className="inner-btn-line">
                        <Button type="primary" onClick={doQuery}>查询</Button>
                        <Button onClick={doReset}>清空</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Query = Form.create()(QueryForm);

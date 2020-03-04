import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {message, Button, Col, Form, Input, Row} from 'antd';
import {rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';

const FormItem = Form.Item;

export function Query() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {fieldsValue} = useSelector((state: any) => {
        return state.search.replace.query;
    });

    function doQuery() {
        const fieldsValue = form.getFieldsValue();
        const filters = rebuildFieldsToFilters(fieldsValue);
        if (filters.length > 0) {
            dispatch(queryCreator.doQuery(fieldsValue));
        } else {
            message.error('请输入零件编号');
        }
    }

    function doReset() {
        form.resetFields();
    }

    return (
        <div className={'query'}>
            <Form layout="inline" form={form} labelAlign="left">
                <FormItem label="零件编号" name={'partCode'}>
                    <Input placeholder="请输入"/>
                </FormItem>
                <span className="inner-btn-line">
                    <Button type="primary" htmlType={'submit'} onClick={doQuery}>查询</Button>
                    <Button onClick={doReset}>清空</Button>
                </span>
            </Form>
        </div>
    );
}


import React from 'react';
import {useDispatch} from 'react-redux';
import cls from 'classnames';
import {Button, Form, Input} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';

const FormItem = Form.Item;

export function Query() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    function doQuery() {
        const fieldsValue = form.getFieldsValue();
        const filters = rebuildFieldsToFilters(fieldsValue);
        const params = buildQueryParams(filters);
        dispatch(queryCreator.doQuery(params));
    }

    function doReset() {
        form.resetFields();
    }

    return (
        <div className={cls([styles.query, 'query'])}>
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
            >
                <FormItem label="订单编号" name={'code'}>
                    <Input placeholder="请输入"/>
                </FormItem>
                <FormItem label="订单备注" name={'note'}>
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


import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Form, Input} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
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
        <div className="query">
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
            >
                <FormItem label="收藏类型" name={'type'}>
                    <Input placeholder="请输入"/>
                </FormItem>
                <FormItem label="收藏名称" name={'name'}>
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


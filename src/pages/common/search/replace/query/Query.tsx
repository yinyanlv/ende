import React from 'react';
import {useDispatch} from 'react-redux';
import {message, Button, Form, Input} from 'antd';
import {rebuildFieldsToFilters} from '@/common/utils';
import {queryCreator} from './actions';

const FormItem = Form.Item;

export function Query() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

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


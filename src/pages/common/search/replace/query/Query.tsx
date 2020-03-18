import React from 'react';
import {useDispatch} from 'react-redux';
import {message, Button, Form, Input} from 'antd';
import {rebuildFieldsToFilters} from '@/common/utils';
import {queryCreator} from './actions';
import {useUtils} from '@/hooks';

const FormItem = Form.Item;

export function Query() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const utils = useUtils();

    function doQuery() {
        const fieldsValue = form.getFieldsValue();
        const filters = rebuildFieldsToFilters(fieldsValue);
        if (filters.length > 0) {
            fieldsValue.partCode = fieldsValue.partCode.trim();
            dispatch(queryCreator.doQuery(fieldsValue));
        } else {
            message.error(utils.getText('msg.a4'));
        }
    }

    function doReset() {
        form.resetFields();
    }

    return (
        <div className={'query'}>
            <Form layout="inline" form={form} labelAlign="left">
                <FormItem label={utils.getText('part.a1')} name={'partCode'}>
                    <Input placeholder={utils.getText('app.a2')}/>
                </FormItem>
                <span className="inner-btn-line">
                    <Button type="primary" htmlType={'submit'} onClick={doQuery}>{utils.getText('operate.a6')}</Button>
                    <Button onClick={doReset}>{utils.getText('operate.a7')}</Button>
                </span>
            </Form>
        </div>
    );
}


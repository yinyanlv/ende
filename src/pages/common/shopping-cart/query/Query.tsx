import React, {forwardRef} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Form, Input} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import {queryCreator} from './actions';
import {useUtils} from '@/hooks';

const FormItem = Form.Item;

function InnerQuery(props, parentRef) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const utils = useUtils();

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
                ref={parentRef}
            >
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

export const Query = forwardRef(InnerQuery);

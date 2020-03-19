import React from 'react';
import {useDispatch} from 'react-redux';
import cls from 'classnames';
import {Button, Form, Input} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';
import {useUtils} from '@/hooks';

const FormItem = Form.Item;

export function Query() {
    const dispatch = useDispatch();
    const utils = useUtils();
    const [form] = Form.useForm();

    function doQuery() {
        const fieldsValue = form.getFieldsValue();
        const filters = rebuildFieldsToFilters(fieldsValue);
        let params = buildQueryParams(filters, 1, 10, [{field: 'createdDate', asc: false}]);
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
                <FormItem label={utils.getText('order.a4')} name={'code'}>
                    <Input placeholder={utils.getText('app.a2')}/>
                </FormItem>
                <FormItem label={utils.getText('order.a5')} name={'note'}>
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


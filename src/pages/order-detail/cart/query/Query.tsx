import React, {forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {message, Button, Form, Input} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';
import {cartCreator} from '@/pages/order-detail/cart/actions';
import {useUtils} from '@/hooks';
import {formatWithOptions} from 'util';

const FormItem = Form.Item;

interface QueryProps {
    isShowAdd: boolean;
}

function InnerQuery(props: QueryProps, parentRef) {
    const dispatch = useDispatch();
    const {orderCode} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const [form] = Form.useForm();
    const utils = useUtils();

    function doQuery() {
        const fieldsValue = form.getFieldsValue();
        fieldsValue.orderCode = orderCode;
        const filters = rebuildFieldsToFilters(fieldsValue);
        const params = buildQueryParams(filters);
        dispatch(queryCreator.doQuery(params));
    }

    function handleClickAdd() {
        const fieldsValue = form.getFieldsValue();

        if (!fieldsValue.partCode) {
            return message.error(utils.getText('msg.a4'));
        }
        const partCode = fieldsValue.partCode && fieldsValue.partCode.trim();

        if (!partCode) {
            return message.error(utils.getText('msg.a4'));
        }

        form.resetFields();
        dispatch(cartCreator.addPart({
            orderCode,
            partCode
        }));
    }

    return (
        <div className={cls([styles.query, 'query'])}>
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
                    {
                        props.isShowAdd && <Button onClick={handleClickAdd}>{utils.getText('order.a18')}</Button>
                    }
                </span>
            </Form>
        </div>
    );
}

export const Query = forwardRef(InnerQuery);

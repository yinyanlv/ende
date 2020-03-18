import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cls from 'classnames';
import {message, Button, Form, Input} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';
import {cartCreator} from '@/pages/order-detail/cart/actions';

const FormItem = Form.Item;

interface QueryProps {
    isShowAdd: boolean;
}

export function Query(props: QueryProps) {
    const dispatch = useDispatch();
    const {orderCode} = useSelector((state: any) => {
        return state.orderDetail.self;
    });
    const [form] = Form.useForm();

    function doQuery() {
        const fieldsValue = form.getFieldsValue();
        fieldsValue.orderCode = orderCode;
        const filters = rebuildFieldsToFilters(fieldsValue);
        const params = buildQueryParams(filters);
        dispatch(queryCreator.doQuery(params));
    }

    function handleClickAdd() {
        const fieldsValue = form.getFieldsValue();
        const partCode = fieldsValue.partCode.trim();

        if (!partCode) {
            return message.error('请输入零件编号');
        }

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
            >
                <FormItem label="零件编号" name={'partCode'}>
                    <Input placeholder="请输入"/>
                </FormItem>
                <span className="inner-btn-line">
                    <Button type="primary" htmlType={'submit'} onClick={doQuery}>查询</Button>
                    {
                        props.isShowAdd && <Button onClick={handleClickAdd}>加入清单</Button>
                    }
                </span>
            </Form>
        </div>
    );
}


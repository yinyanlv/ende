import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import cls from 'classnames';
import {message, Select, Button, Cascader, Col, Form, Input, Row} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';
import {vinSearchCreator} from "@/pages/common/vin-search/actions";

const FormItem = Form.Item;
const Option = Select.Option;

export function QueryForm(props: any) {
    const dispatch = useDispatch();
    const {groupList, modelOptions, fieldsValue} = useSelector((state: any) => {
       return state.search.advanceSearch.query;
    });
    const {getFieldDecorator} = props.form;

    function doQuery() {
       props.form.validateFields((err, values) => {
           if (!err) {
               values = rebuildModelField(values);
               const filters = rebuildFieldsToFilters(values);
               if (filters.length > 0) {
                   const params = buildQueryParams(filters);
                   dispatch(queryCreator.doQuery(params));
               } else {
                   message.error('请输入查询条件');
               }
           }
       });
    }

    function rebuildModelField(values) {
        const models = values.model;
        if (models && models.length) {
            models.forEach((item, index) => {
                values[`m${index + 1}`] = item;
            });
        }
        delete values.model;

        return values;
    }

    useEffect(() => {
        dispatch(queryCreator.loadGroup());
        const model = fieldsValue.model;
        if (model && model.length > 0) {
            dispatch(queryCreator.loadModelOptions(model));
        } else {
            dispatch(queryCreator.loadM1());
        }
    }, []);

    function doReset() {
        props.form.resetFields();
    }

    function handleModelChange(value, selectedOptions) {
        if (value.length === 1) {
            return dispatch(queryCreator.loadM2({
                m1: value[0]
            }));
        } else if (value.length === 2) {

            return dispatch(queryCreator.loadM3({
                m1: value[0],
                m2: value[1]
            }));
        } else if (value.length === 3) {

            return dispatch(queryCreator.loadM4({
                m1: value[0],
                m2: value[1],
                m3: value[2]
            }));
        }
    }

    function showVinDetail() {
        const vinVsn = props.form.getFieldValue('vinVsn');

        if (!vinVsn) {
             return message.error('请输入VIN或VSN编码');
        }

        const code = vinVsn.trim();

        const result = checkAndGetType(code);
        if (result.isValid) {
           if (result.type === 'vin') {
               dispatch(vinSearchCreator.doVinSearch({
                   code,
                   doNotRedirect: true
               }));
           } else if (result.type === 'vsn') {
               dispatch(vinSearchCreator.doVsnSelectModel({
                   code,
                   doNotRedirect: true
               }));
           }
        } else {
            message.error('输入的VIN或VSN编码不合法');
        }
    }

    function checkAndGetType(val) {
        // vin查询，包含lzw或mk3,不包含中文就查询vin
        if (/^.*(lzw|mk3|lk6).*$/i.test(val) && !/[\u4e00-\u9fa5]+/.test(val)) {
            return {
                isValid: true,
                type: 'vin'
            };
        } else if (/^[A-Za-z0-9]{14,15}$/.test(val)) {
            // vsn查询，14/15 and 字母+数字查询vsn
            return {
                isValid: true,
                type: 'vsn'
            };
        } else {
            return {
                isValid: false
            };
        }
    }

    return (
        <div className={cls(styles.query, 'query')}>
            <Form layout="inline" labelAlign="left">
                <Row>
                    <Col span={8}>
                        <div className="first-column vin-wrapper">
                            <FormItem label="VIN/VSN">
                                {
                                    getFieldDecorator('vinVsn', {
                                        initialValue: fieldsValue.vinVsn
                                    })(
                                        <Input placeholder="请输入"/>
                                    )
                                }
                            </FormItem>
                            <span className="btn" onClick={showVinDetail}>详细</span>
                        </div>
                    </Col>
                    <Col span={16} className="model-wrapper">
                        <FormItem label="车型">
                            {
                                getFieldDecorator('model', {
                                    initialValue: fieldsValue.model
                                })(
                                    <Cascader options={modelOptions} onChange={handleModelChange} placeholder="品牌/目录/年份/车型"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label="主组">
                                {
                                    getFieldDecorator('legendGroupCode', {
                                        initialValue: fieldsValue.legendGroupCode
                                    })(
                                        <Select placeholder={'请选择'} dropdownMatchSelectWidth={false} allowClear={true}>
                                            {
                                                groupList.map((item) => {
                                                    return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例编号">
                            {
                                getFieldDecorator('legendCode', {
                                    initialValue: fieldsValue.legendCode
                                })(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例描述">
                            {
                                getFieldDecorator('legendName', {
                                    initialValue: fieldsValue.legendName
                                })(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label="图例备注">
                                {
                                    getFieldDecorator('legendNote', {
                                        initialValue: fieldsValue.legendNote
                                    })(
                                        <Input placeholder="请输入"/>
                                    )
                                }
                            </FormItem>
                        </div>
                    </Col>
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
                    <Col span={8}>
                        <FormItem label="零件描述">
                            {
                                getFieldDecorator('partName', {
                                    initialValue: fieldsValue.partName
                                })(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="btn-line">
                        <Button type="primary" onClick={doQuery}>查询</Button>
                        <Button onClick={doReset}>清空</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Query = Form.create()(QueryForm);

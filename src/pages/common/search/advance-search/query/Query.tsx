import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Select, Button, Cascader, Col, Form, Input, Row} from 'antd';
import {buildQueryParams} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';

const FormItem = Form.Item;
const Option = Select.Option;

export function QueryForm(props: any) {
    const dispatch = useDispatch();
    const {groupList, modelOptions} = useSelector((state: any) => {
       return state.search.advanceSearch.query;
    });
    const {getFieldDecorator} = props.form;

    function doQuery() {
       props.form.validateFields((err, values) => {
           if (!err) {
               const params = buildQueryParams(values);
               dispatch(queryCreator.doQuery(params));
           }
       });
    }

    useEffect(() => {
        dispatch(queryCreator.loadGroup());
        dispatch(queryCreator.loadM1());
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

    return (
        <div className={styles.query}>
            <Form layout="inline" labelAlign="left">
                <Row>
                    <Col span={8}>
                        <div className="first-column vin-wrapper">
                            <FormItem label="VIN/VSN">
                                {
                                    getFieldDecorator('vinVsn', {})(
                                        <Input placeholder="请输入"/>
                                    )
                                }
                            </FormItem>
                            <span className="btn">详细</span>
                        </div>
                    </Col>
                    <Col span={16} className="model-wrapper">
                        <FormItem label="车型">
                            {
                                getFieldDecorator('model', {
                                    initialValue: ["BAOJUN", "CN180C"]
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
                                    getFieldDecorator('legendGroupCode', [])(
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
                                getFieldDecorator('legendCode', [])(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例描述">
                            {
                                getFieldDecorator('legendName', [])(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label="图例备注">
                                {
                                    getFieldDecorator('legendNote', [])(
                                        <Input placeholder="请输入"/>
                                    )
                                }
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件编号">
                            {
                                getFieldDecorator('partCode', [])(
                                    <Input placeholder="请输入"/>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件描述">
                            {
                                getFieldDecorator('partName', [])(
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

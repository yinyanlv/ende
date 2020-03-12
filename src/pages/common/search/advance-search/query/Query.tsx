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

export function Query() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {zIndex} = useSelector((state: any) => {
        return state.search.self;
    });
    const detailZIndex = useSelector((state: any) => {
        return state.vinDetail.zIndex;
    });
    const selectorZIndex = useSelector((state: any) => {
        return state.vsnSelector.zIndex;
    });
    const {groupList, modelOptions, fieldsValue} = useSelector((state: any) => {
        return state.search.advanceSearch.query;
    });

    function doQuery() {
        let fieldsValue = form.getFieldsValue();
        let code = fieldsValue.vinVsn && fieldsValue.vinVsn.trim();

        // 如果填写了vinVsn，走特殊的流程
        if (code) {
            const result = checkAndGetType(code);

            if (!result.isValid) {
                return message.error('输入的VIN或VSN编码不合法');
            }

            fieldsValue = rebuildModelField(fieldsValue);
            const filters = rebuildFieldsToFilters(fieldsValue);
            const params = buildQueryParams(filters);

            if (result.type === 'vin') {
                dispatch(queryCreator.doQuery(params));
            } else if (result.type === 'vsn') {
                dispatch(vinSearchCreator.doVsnSelectModel({
                    code,
                    doNotRedirect: true,
                    advanceSearchParams: params,
                    zIndex: Math.max(zIndex, selectorZIndex) + 5
                }));
            }
        } else {
            fieldsValue = rebuildModelField(fieldsValue);
            const filters = rebuildFieldsToFilters(fieldsValue);
            if (filters.length > 0) {
                const params = buildQueryParams(filters);
                dispatch(queryCreator.doQuery(params));
            } else {
                message.error('请输入查询条件');
            }
        }
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
        dispatch(queryCreator.loadM1());
    }, []);

    function doReset() {
        form.resetFields();
    }

    function handleLoadModel(selectedOptions) {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        const len = selectedOptions.length;
        targetOption.loading = true;

        if (len === 1) {
            return dispatch(queryCreator.loadM2({
                m1: selectedOptions[0].value
            }));
        } else if (len === 2) {

            return dispatch(queryCreator.loadM3({
                m1: selectedOptions[0].value,
                m2: selectedOptions[1].value
            }));
        } else if (len === 3) {

            return dispatch(queryCreator.loadM4({
                m1: selectedOptions[0].value,
                m2: selectedOptions[1].value,
                m3: selectedOptions[2].value
            }));
        }
    }

    function showVinDetail() {
        const vinVsn = form.getFieldValue('vinVsn');

        if (!vinVsn) {
            return message.error('请输入VIN或VSN编码');
        }

        const code = vinVsn.trim();

        const result = checkAndGetType(code);
        if (result.isValid) {
            if (result.type === 'vin') {
                dispatch(vinSearchCreator.doVinSearch({
                    code,
                    doNotRedirect: true,
                    zIndex: Math.max(zIndex, detailZIndex) + 5
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
        <div className={cls(styles.query, 'query', 'multi-line')}>
            <Form
                layout="inline"
                labelAlign="left"
                form={form}
                initialValues={fieldsValue}
            >
                <Row>
                    <Col span={8}>
                        <div className="first-column vin-wrapper">
                            <FormItem label="VIN/VSN" name={'vinVsn'}>
                                <Input placeholder="请输入"/>
                            </FormItem>
                            <span className="btn" onClick={showVinDetail}>详细</span>
                        </div>
                    </Col>
                    <Col span={16} className="model-wrapper">
                        <FormItem label="车型" name={'model'}>
                            <Cascader options={modelOptions} loadData={handleLoadModel} placeholder="品牌/目录/年份/车型"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label="主组" name={'legendGroupCode'}>
                                <Select placeholder={'请选择'} style={{width: 155}} allowClear={true}>
                                    {
                                        groupList.map((item) => {
                                            return <Option key={item.code} value={item.code}>{item.name}</Option>;
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例编号" name={'legendCode'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例描述" name={'legendName'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label="图例备注" name={'legendNote'}>
                                <Input placeholder="请输入"/>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件编号" name={'partCode'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件描述" name={'partName'}>
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                </Row>
                <div className="btn-line">
                    <Button type="primary" htmlType={'submit'} onClick={doQuery}>查询</Button>
                    <Button onClick={doReset}>清空</Button>
                </div>
            </Form>
        </div>
    );
}


import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import cls from 'classnames';
import {message, Select, Button, Cascader, Col, Form, Input, Row} from 'antd';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import styles from './Query.module.scss';
import {queryCreator} from './actions';
import {vinSearchCreator} from "@/pages/common/vin-search/actions";
import {configCreator} from '@/store/config/actions';
import {useUtils} from '@/hooks';

const FormItem = Form.Item;
const Option = Select.Option;

export function Query() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const utils = useUtils();
    const {maxZIndex} = useSelector((state: any) => {
       return state.config;
    });
    const {groupList, modelOptions, fieldsValue, isShowBtnDetail} = useSelector((state: any) => {
        return state.search.advanceSearch.query;
    });

    function doQuery() {
        let fieldsValue = form.getFieldsValue();
        let code = fieldsValue.vinVsn && fieldsValue.vinVsn.trim();

        // 如果填写了vinVsn，走特殊的流程
        if (code) {
            const result = checkAndGetType(code);

            if (!result.isValid) {
                return message.error(utils.getText('msg.a1'));
            }

            fieldsValue = rebuildModelField(fieldsValue);
            const filters = rebuildFieldsToFilters(fieldsValue);
            const params = buildQueryParams(filters);

            if (result.type === 'vin') {
                dispatch(queryCreator.doQuery(params));
            } else if (result.type === 'vsn') {
                const newMaxZIndex = maxZIndex + 5;
                dispatch(vinSearchCreator.doVsnSelectModel({
                    code,
                    doNotRedirect: true,
                    advanceSearchParams: params,
                    zIndex: newMaxZIndex
                }));
                dispatch(configCreator.setMaxZIndex({
                    maxZIndex: newMaxZIndex
                }));
            }
        } else {
            fieldsValue = rebuildModelField(fieldsValue);
            const filters = rebuildFieldsToFilters(fieldsValue);
            if (filters.length > 0) {
                const params = buildQueryParams(filters);
                dispatch(queryCreator.doQuery(params));
            } else {
                message.error(utils.getText('msg.a2'));
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

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(fieldsValue);
    }, [fieldsValue]);

    function doReset() {
        form.resetFields();
        dispatch(queryCreator.setFieldsValue({}));
        dispatch(queryCreator.setIsShowBtnDetail({isShowBtnDetail: false}));
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
            return message.error(utils.getText('msg.a3'));
        }

        const code = vinVsn.trim();

        const result = checkAndGetType(code);
        if (result.isValid) {
            if (result.type === 'vin') {
                const newMaxZIndex = maxZIndex + 5;
                dispatch(vinSearchCreator.doVinSearch({
                    code,
                    doNotRedirect: true,
                    zIndex: newMaxZIndex
                }));
                dispatch(configCreator.setMaxZIndex({
                    maxZIndex: newMaxZIndex
                }));
            } else if (result.type === 'vsn') {
                dispatch(vinSearchCreator.doVsnSelectModel({
                    code,
                    doNotRedirect: true
                }));
            }
        } else {
            message.error(utils.getText('msg.a1'));
        }
    }

    function validateVinVsn() {
        const vinVsn = form.getFieldValue('vinVsn');

        if (!vinVsn) {
            dispatch(queryCreator.setIsShowBtnDetail({isShowBtnDetail: false}));
            return;
        }
        const code = vinVsn.trim();
        const result = checkAndGetType(code);
        if (result.isValid) {
            if (result.type === 'vin') {
                dispatch(queryCreator.validateVin({code}));
            } else if (result.type === 'vsn') {
                dispatch(queryCreator.validateVsn({code}));
            }
        } else {
            dispatch(queryCreator.setIsShowBtnDetail({isShowBtnDetail: false}));
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
                                <Input placeholder={utils.getText('app.a2')} onChange={validateVinVsn}/>
                            </FormItem>
                            {
                                isShowBtnDetail && <span className="btn" onClick={showVinDetail}>{utils.getText('search.a4')}</span>
                            }
                        </div>
                    </Col>
                    <Col span={16} className="model-wrapper">
                        <FormItem label={utils.getText('part.a11')} name={'model'}>
                            <Cascader options={modelOptions} loadData={handleLoadModel} placeholder={utils.getText('search.a3')}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label={utils.getText('part.a12')} name={'legendGroupCode'}>
                                <Select placeholder={utils.getText('app.a3')} style={{width: 155}} allowClear={true}>
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
                        <FormItem label={utils.getText('legend.a1')} name={'legendCode'}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={utils.getText('legend.a2')} name={'legendName'}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <div className="first-column">
                            <FormItem label={utils.getText('legend.a3')} name={'legendNote'}>
                                <Input placeholder={utils.getText('app.a2')}/>
                            </FormItem>
                        </div>
                    </Col>
                    <Col span={8}>
                        <FormItem label={utils.getText('part.a1')} name={'partCode'}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label={utils.getText('part.a2')} name={'partName'}>
                            <Input placeholder={utils.getText('app.a2')}/>
                        </FormItem>
                    </Col>
                </Row>
                <div className="btn-line">
                    <Button type="primary" htmlType={'submit'} onClick={doQuery}>{utils.getText('operate.a6')}</Button>
                    <Button onClick={doReset}>{utils.getText('operate.a7')}</Button>
                </div>
            </Form>
        </div>
    );
}


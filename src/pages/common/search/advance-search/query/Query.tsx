import React from 'react';
import {Button, Cascader, Col, Form, Input, Row} from 'antd';
import styles from './Query.module.scss';

const FormItem = Form.Item;

export function InnerQuery(props: any) {
    const {getFieldDecorator} = props.form;

    const options = [];

    function doQuery() {
       props.form.validateFields((err, values) => {
           if (!err) {
               console.log(values);
           }
       });
    }

    function doReset() {
        console.log(222);
    }

    return (
        <div className={styles.query}>
            <Form layout="inline" labelAlign="left">
                <Row>
                    <Col span={8}>
                        <div className="vin-wrapper">
                            <FormItem label="VIN/VSN">
                                {
                                    getFieldDecorator('vin', {})(
                                        <Input placeholder="请输入"/>
                                    )
                                }
                            </FormItem>
                            <span className="btn">详细</span>
                        </div>
                    </Col>
                    <Col span={16}>
                        <FormItem label="车型">
                            <Cascader options={options} placeholder="品牌/目录/年份/车型"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="主组">
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例编号">
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例描述">
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="图例备注">
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件编号">
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="零件描述">
                            <Input placeholder="请输入"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit" onClick={doQuery}>搜索</Button>
                        <Button style={{marginLeft: 8}} onClick={doReset}>清空</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export const Query = Form.create()(InnerQuery);

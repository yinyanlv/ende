import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer, Button, Form, Row, Col, Input, Table} from 'antd';
import {shoppingCartCreator} from './actions';

const FormItem = Form.Item;

export function ShoppingCart(props) {

    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: any) => {
        return state.shoppingCart;
    });

    const columns = [
        {
            title: '零件信息',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '量',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '小计(元)',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'tags',
            dataIndex: 'tags'
        }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    function handleClose() {
        dispatch(shoppingCartCreator.setIsShowShoppingCart({
            isShow: false
        }));
    }

    return (
        <Drawer
            closable={false}
            visible={shoppingCart.isShow}
            onClose={handleClose}
            width={'700px'}
        >
           <div className="vinDetailContainer">
               <div>
                  购物车
               </div>
               <div>
                   <div className="query">
                       <Form className="ant-advanced-search-form" layout="inline" labelAlign="left">
                           <Row>
                               <Col span={8}>
                                   <div className="vin-wrapper">
                                       <FormItem label="零件编号">
                                           <Input placeholder="请输入"/>
                                       </FormItem>
                                   </div>
                               </Col>
                           </Row>
                           <Row>
                               <Col span={24} style={{textAlign: 'center'}}>
                                   <Button type="primary" htmlType="submit">搜索</Button>
                                   <Button style={{marginLeft: 8}}>清空</Button>
                               </Col>
                           </Row>
                       </Form>
                   </div>
                   <div className="grid">
                       <div className="part-list-container">
                           <div className="part-list">
                               <Table columns={columns} dataSource={data}/>
                           </div>
                       </div>
                   </div>
               </div>
               <div>
                   <Button type="primary">生成订单</Button>
               </div>
           </div>
        </Drawer>
    );
}

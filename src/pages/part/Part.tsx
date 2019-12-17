import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Descriptions, Tabs, Button, Table, message} from 'antd';
import cls from 'classnames';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {ImageGallery} from '@/components/image-gallery';
import styles from './part.module.scss';
import {Link} from 'react-router-dom';

const TabPane = Tabs.TabPane;

export function PagePart() {
    const dispatch = useDispatch();

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
    }, {
        title: '零件编号',
        dataIndex: 'partNumber',
        width: 100,
        render: (text, record) => (
            <span>
            <Link to='/part/111111'>{text}</Link>
            </span>
        )
    }, {
        title: '左右',
        dataIndex: 'age',
        width: 50
    }, {
        title: '名称描述',
        dataIndex: 'name'
    }, {
        title: '年',
        dataIndex: 'year',
        width: 60
    }, {
        title: '用途',
        dataIndex: 'usage'
    }, {
        title: '量',
        dataIndex: 'count',
        width: 40
    }, {
        title: '操作',
        dataIndex: '',
        width: 80,
        render: (text, record) => (
            <span>
            <Button>购买</Button>
            </span>
        )
    }];

    const data: any = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            callout: i,
            name: `凸轮轴轴承盖螺栓`,
            year: 2018,
            age: 32,
            count: 121,
            partNumber: 23864864,
            usage: `(DB)(DC)(DD) 36 (LJO M2P)`,
        });
    }

    useEffect(() => {
        dispatch(crumbsCreator.setCrumbs([{
            code: 'part-detail',
            name: '配件详情'
        }]));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleClickBuy() {
        message.success('购买');
    }

    return (
        <div className={cls(['inner-container', styles.container])}>
            <div className="part-detail">
                <div className="magnifier-box">
                    <ImageGallery items={[{
                        thumbnail: '/images/parts/part_1_small.jpg',
                        original: '/images/parts/part_1_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_2_small.jpg',
                        original: '/images/parts/part_2_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_3_small.jpg',
                        original: '/images/parts/part_3_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_1_small.jpg',
                        original: '/images/parts/part_1_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_2_small.jpg',
                        original: '/images/parts/part_2_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_3_small.jpg',
                        original: '/images/parts/part_3_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_1_small.jpg',
                        original: '/images/parts/part_1_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_2_small.jpg',
                        original: '/images/parts/part_2_large.jpg'
                    }, {
                        thumbnail: '/images/parts/part_3_small.jpg',
                        original: '/images/parts/part_3_large.jpg'
                    }]}/>
                </div>
                <div className="part-info-box">
                    <Descriptions
                        title="配件详情"
                        bordered
                        column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}
                        style={{width: '500px'}}
                    >
                        <Descriptions.Item label="零件编号">24565891</Descriptions.Item>
                        <Descriptions.Item label="零件描述">发动机后吊架螺栓</Descriptions.Item>
                        <Descriptions.Item label="最小包装数">5</Descriptions.Item>
                        <Descriptions.Item label="价格">$80.00</Descriptions.Item>
                        <Descriptions.Item label="库位">$20.00</Descriptions.Item>
                        <Descriptions.Item label="运输方式">$60.00</Descriptions.Item>
                        <Descriptions.Item label="备注">''</Descriptions.Item>
                    </Descriptions>
                    <div className="btn-line">
                        <Button type="primary" icon={'shopping-cart'} onClick={handleClickBuy}>购买</Button>
                    </div>
                </div>
            </div>
            <div className="part-table-tabs">
                <Tabs defaultActiveKey="1" onChange={() => {
                }} style={{width: '100%'}}>
                    <TabPane tab="替换关系" key="1">
                        <Table columns={columns} dataSource={data} size={'small'}
                               scroll={{y: styles.partsTableBodyHeight}}
                               pagination={false}/>
                    </TabPane>
                    <TabPane tab="用户备注" key="2">
                        <Table columns={columns} dataSource={data} size={'small'}
                               scroll={{y: styles.partsTableBodyHeight}}
                               pagination={false}/>
                    </TabPane>
                    <TabPane tab="通讯" key="3">
                        <Table columns={columns} dataSource={data} size={'small'}
                               scroll={{y: styles.partsTableBodyHeight}}
                               pagination={false}/>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

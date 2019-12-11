import React from 'react';
import {Button, Table, Icon, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import styles from './Parts.module.scss';

export function Parts(props: any) {

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
    }, {
        title: '零件编号',
        dataIndex: 'partCode',
        width: 140,
        render: (val, record) => {
            return (
                <div className="operator-wrapper">
                    <Link to={'/part/' + val} target={'_blank'}>{val}</Link>
                    <div className="operator-line">
                        <Tooltip title={'备注'}>
                            <Icon type={'form'} onClick={handleClickCar} />
                        </Tooltip>
                        <Tooltip title={'复制'}>
                            <Icon type={'copy'} onClick={handleClickCar} />
                        </Tooltip>
                        <Tooltip title={'加入购物车'}>
                            <Icon type={'shopping-cart'} onClick={handleClickCar} />
                        </Tooltip>
                        <Tooltip title={'替换关系'}>
                            <Icon type={'retweet'} onClick={handleClickCar} />
                        </Tooltip>
                        <Tooltip title={'配件反查'}>
                            <Icon type={'car'} onClick={handleClickCar} />
                        </Tooltip>
                    </div>
                </div>
            );
        }
    }, {
        title: '左右',
        dataIndex: 'handName',
        width: 70
    }, {
        title: '名称描述',
        dataIndex: 'name'
    }, {
        title: '用途',
        dataIndex: 'usage'
    }, {
        title: '量',
        dataIndex: 'formattedQty',
        width: 40
    }, {
        title: '操作',
        dataIndex: '',
        width: 80,
        render: (val, record) => (
            <span>
            <Button>购买</Button>
            </span>
        )
    }];

    function handleClickCar() {
        console.log('clicked car!');
    }

    return (
        <Table columns={columns}
               dataSource={props.data || []}
               rowKey={'partCode'}
               size={'small'}
               scroll={{y: styles.partsTableBodyHeight}}
               className={styles.partList}
               pagination={false}
        />
    );
}

import React, {useState, useEffect} from 'react';
import {Button, Table, Icon, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {UsagePopover} from './usagePopover';
import styles from './Parts.module.scss';

interface PartsProps {
    data: any[],
    onSelectParts: Function,
    activeCallout?: any
}

export function Parts(props: PartsProps) {
    const [selectedKeys, setSelectedKeys]: [any[], any] = useState([]);
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
                            <Icon type={'form'} onClick={handleClickCar}/>
                        </Tooltip>
                        <Tooltip title={'复制'}>
                            <Icon type={'copy'} onClick={handleClickCar}/>
                        </Tooltip>
                        <Tooltip title={'加入购物车'}>
                            <Icon type={'shopping-cart'} onClick={handleClickCar}/>
                        </Tooltip>
                        <Tooltip title={'替换关系'}>
                            <Icon type={'retweet'} onClick={handleClickCar}/>
                        </Tooltip>
                        <Tooltip title={'配件反查'}>
                            <Icon type={'car'} onClick={handleClickCar}/>
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
        dataIndex: 'usage',
        render: (val, record) => (
            <UsagePopover params={{id: record.id}}>
                <span>abcdefg</span>
            </UsagePopover>
        )
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

    useEffect(() => {
        if (props.activeCallout) {
            const keys = getKeysByCallout(props.activeCallout);
            setSelectedKeys(keys);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeCallout]);

    function handleClickCar() {
        console.log('clicked car!');
    }

    function handleSelect(record) {
        const keys = getKeysByCallout(record.callout);
        props.onSelectParts(record.callout);
        setSelectedKeys(keys);
    }

    function getKeysByCallout(callout) {
        let keys: any[] = [];

        props.data.forEach((record) => {
            if (record.callout === callout) {
                keys.push(record.id);
            }
        });

        return keys;
    }

    return (
        <Table columns={columns}
               dataSource={props.data || []}
               rowKey={'id'}
               size={'small'}
               scroll={{y: styles.partsTableBodyHeight}}
               className={styles.partList}
               pagination={false}
               onRow={(record) => {
                    return {
                      onClick: function () {
                          handleSelect(record);
                      }
                    };
               }}
               rowSelection={{
                   selectedRowKeys: selectedKeys,
                   onSelect: (record) => {
                       handleSelect(record);
                   }
               }}
        />
    );
}

import React, {useState, useEffect} from 'react';
import {Button, Table, Icon, Tooltip, message} from 'antd';
import copy from 'copy-to-clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {Panel} from '@/components/panel';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {UsagePopover} from './usagePopover';
import styles from './Parts.module.scss';
import {partDetailCreator} from '@/pages/common/part-detail/actions';

interface PartsProps {
    isShowParts: boolean;
    activeCallout?: any;
    onSelectParts: Function;
    onClickLeftArrow?: Function;
    onClickRightArrow?: Function;
}

function Parts(props: PartsProps) {

    const dispatch = useDispatch();
    const {
        isPartsLoading,
        parts
    } = useSelector((state: any) => {
        return state.parts;
    });
    const usages = parts.usages || [];
    const [selectedKeys, setSelectedKeys]: [any[], any] = useState([]);

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        width: 40,
        ellipsis: true
    }, {
        title: '零件编号',
        dataIndex: 'partCode',
        width: 150,
        ellipsis: true,
        render: (val, record) => {
            return (
                <div className="operator-wrapper">
                    <span className="link-button" onClick={(e) => {
                        showPartDetail(e, val);
                    }}>{val}</span>
                    <span className={'operator-btns'}>
                          <Tooltip title={'复制'}>
                            <Icon type={'copy'} onClick={(e) => {
                                handleClickCopy(e, val);
                            }}/>
                          </Tooltip>
                        <Tooltip title={'替换关系'}>
                            <Icon type={'retweet'} onClick={(e) => {
                                handleClickReplace(e, val);
                            }}/>
                        </Tooltip>
                    </span>
                </div>
            );
        }
    }, {
        title: '左右',
        dataIndex: 'handName',
        ellipsis: true,
        width: 70
    }, {
        title: '名称描述',
        dataIndex: 'name',
        ellipsis: true
    }, {
        title: '用途',
        dataIndex: 'note',
        ellipsis: true,
        render: (val, record) => (
            <UsagePopover params={{id: record.id}}>
                <span>{val}</span>
            </UsagePopover>
        )
    }, {
        title: '量',
        dataIndex: 'formattedQty',
        ellipsis: true,
        width: 40
    }, {
        title: '操作',
        ellipsis: true,
        width: 60,
        render: (val, record) => (
            <Tooltip title={'加入购物车'}>
                <Button type="primary" icon="shopping-cart" size={'small'} onClick={(e) => {
                    handleClickCart(e, record.partCode);
                }}/>
            </Tooltip>
        )
    }];

    useEffect(() => {
        if (props.activeCallout) {
            const keys = getKeysByCallout(props.activeCallout);
            setSelectedKeys(keys);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeCallout, isPartsLoading]);

    function showPartDetail(e, partCode) {
        e.stopPropagation();
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode
        }));
    }

    function handleClickCart(e, partCode) {
        e.stopPropagation();
        dispatch(shoppingCartCreator.addAndShowShoppingCart({
            partCode: partCode
        }));
    }

    function handleClickCopy(e, val) {
        e.stopPropagation();
        copy(val);
        message.success('已复制到剪贴板');
    }

    function handleClickReplace(e, partCode) {
        e.stopPropagation();
        dispatch(partDetailCreator.loadAndShowPartDetail({
            partCode: partCode,
            activeTab: 'replace'
        }));
    }

    function handleSelect(record) {
        const keys = getKeysByCallout(record.callout);
        props.onSelectParts(record.callout);
        setSelectedKeys(keys);
    }

    function getKeysByCallout(callout) {
        let keys: any[] = [];

        usages.forEach((record) => {
            if (record.callout === callout) {
                keys.push(record.id);
            }
        });

        return keys;
    }

    function handleClickLeftArrow() {
        props.onClickLeftArrow && props.onClickLeftArrow();
    }

    function handleClickRightArrow() {
        props.onClickRightArrow && props.onClickRightArrow();
    }

    return (
        <div className={styles.parts} style={{marginRight: props.isShowParts ? '0' : '-730px'}}>
            <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                <Table columns={columns}
                       dataSource={usages}
                       rowKey={'id'}
                       size={'small'}
                       scroll={{y: styles.partsTableBodyHeight}}
                       className={'part-list'}
                       tableLayout={'fixed'}
                       pagination={false}
                       onRow={(record) => {
                           return {
                               onClick: () => {
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
            </Panel>
            {
                props.isShowParts ? (
                    <span className="btn-arrow right-arrow" onClick={handleClickRightArrow}><Icon type="right"/></span>
                ) : (
                    <span className="btn-arrow left-arrow" onClick={handleClickLeftArrow}><Icon type="left"/></span>
                )
            }
        </div>
    );
}

export default React.memo(Parts);

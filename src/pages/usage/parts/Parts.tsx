import React, {useEffect} from 'react';
import {Button, Table, Tooltip, message} from 'antd';
import {ShoppingCartOutlined, CopyOutlined, RetweetOutlined, RightOutlined, LeftOutlined} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {Panel} from '@/components/panel';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {Application} from './application';
import styles from './Parts.module.scss';
import {partsCreator} from './actions';
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
        parts,
        selectedKeys
    } = useSelector((state: any) => {
        return state.parts;
    });
    const usages = parts.usages || [];

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
                    <span className={'btns'}>
                          <Tooltip title={'复制'}>
                            <CopyOutlined onClick={(e) => {
                                handleClickCopy(e, val);
                            }}/>
                          </Tooltip>
                        <Tooltip title={'替换关系'}>
                            {
                                record.hasSupersession ? (
                                        <RetweetOutlined onClick={(e) => {
                                            handleClickReplace(e, val);
                                        }}/>) :
                                        <RetweetOutlined className={'disabled'} onClick={(e) => {
                                            e.stopPropagation();
                                        }}/>
                            }
                        </Tooltip>
                    </span>
                </div>
            );
        }
    }, {
        title: '左右',
        dataIndex: 'handName',
        ellipsis: true,
        width: 80
    }, {
        title: '名称描述',
        dataIndex: 'name',
        width: 140,
        ellipsis: true
    }, {
        title: '用途',
        dataIndex: 'note',
        ellipsis: true,
        width: 140,
        render: (val, record) => (
            <Application params={{id: record.id}}>
                <span>{val}</span>
            </Application>
        )
    }, {
        title: '量',
        dataIndex: 'formattedQty',
        ellipsis: true,
        width: 40
    }, {
        title: '操作',
        ellipsis: true,
        render: (val, record) => (
            <Tooltip title={'加入购物车'}>
                <Button type="primary" icon={<ShoppingCartOutlined/>} size={'small'} onClick={(e) => {
                    handleClickCart(e, record.partCode);
                }}/>
            </Tooltip>
        )
    }];

    useEffect(() => {
        if (props.activeCallout) {
            const keys = getKeysByCallout(props.activeCallout);
            dispatch(partsCreator.setSelectedKeys(keys));
            scrollIntoView();
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
        dispatch(partsCreator.setSelectedKeys(keys));
        scrollIntoView();
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

    function scrollIntoView() {
        // setTimeout(() => {
        //     const nodes: any = document.querySelectorAll('.part-list .ant-table-row-selected');
        //     if (nodes && nodes.length > 0) {
        //         nodes[0].scrollIntoView();
        //     }
        // }, 200);
    }

    return (
        <div className={styles.parts} style={{marginRight: props.isShowParts ? '0' : '-730px'}}>
            <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                <Table columns={columns}
                       dataSource={usages}
                       className={usages.length > 0 ? 'part-list' : 'part-list empty-table'}
                       rowKey={'id'}
                       size={'small'}
                       scroll={{
                           x: styles.tableInnerWidth,
                           y: styles.tableBodyHeight
                       } as any}
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
                           selectedRowKeys: selectedKeys
                       }}
                />
            </Panel>
            {
                props.isShowParts ? (
                    <span className="btn-arrow right-arrow" onClick={handleClickRightArrow}><RightOutlined/></span>
                ) : (
                    <span className="btn-arrow left-arrow" onClick={handleClickLeftArrow}><LeftOutlined/></span>
                )
            }
        </div>
    );
}

export default React.memo(Parts);

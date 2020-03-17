import React, {useEffect} from 'react';
import {Button, Table, Tooltip, message} from 'antd';
import {ShoppingCartOutlined, CopyOutlined, RetweetOutlined, RightOutlined, LeftOutlined} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {Panel} from '@/components/panel';
import {shoppingCartCreator} from '@/pages/common/shopping-cart/actions';
import {Application} from '@/pages/common/application';
import styles from './Parts.module.scss';
import {partsCreator} from './actions';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {Resizable} from 're-resizable';


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
        selectedKeys,
        width
    } = useSelector((state: any) => {
        return state.parts;
    });
    const groupsWidth = useSelector((state: any) => {
        return state.groups.width;
    });
    const usages = parts.usages || [];

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

        if (keys.length && selectedKeys.includes(keys[0])) {
            props.onSelectParts('');
            dispatch(partsCreator.setSelectedKeys([]));
        } else {
            props.onSelectParts(record.callout);
            dispatch(partsCreator.setSelectedKeys(keys));
        }
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
        setTimeout(() => {
            const nodes: any = document.querySelectorAll('.part-list .ant-table-row-selected');
            if (nodes && nodes.length > 0) {
                nodes[0].scrollIntoView();
            }
        }, 200);
    }

    function handleResize(e, direction, ref, delta) {
        dispatch(partsCreator.setWidth({
            width: width + delta.width
        }));
    }

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        className: 'row-number',
        width: 50,
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
        width: 100
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
            <Application list={record.options || []}>
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
        width: 80,
        render: (val, record) => (
            <Tooltip title={'加入购物车'}>
                <Button type="primary" icon={<ShoppingCartOutlined/>} size={'small'} onClick={(e) => {
                    handleClickCart(e, record.partCode);
                }}/>
            </Tooltip>
        )
    }];

    return (
        <Resizable
            minWidth={400}
            maxWidth={window.innerWidth - groupsWidth - 295}
            defaultSize={{width: width, height: window.innerHeight - 100}}
            enable={{left: true}}
            onResizeStop={handleResize}
            style={{marginRight: props.isShowParts ? '0' : -(width + 10) + 'px'}}
        >
            <div className={styles.parts}>
                <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                    <Table columns={columns}
                           dataSource={usages}
                           className={usages.length > 0 ? 'part-list' : 'part-list empty-table'}
                           rowKey={'id'}
                           size={'small'}
                           scroll={{
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
        </Resizable>
    );
}

export default React.memo(Parts);

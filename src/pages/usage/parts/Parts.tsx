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
import {useUtils} from '@/hooks';
import {NoData} from '@/components/no-data';


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
    const utils = useUtils();

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
        message.success(utils.getText('msg.a7'));
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
        title: utils.getText('part.a1'),
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
                          <Tooltip title={utils.getText('operate.a10')}>
                            <CopyOutlined onClick={(e) => {
                                handleClickCopy(e, val);
                            }}/>
                          </Tooltip>
                        <Tooltip title={utils.getText('replace.a1')}>
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
        title: utils.getText('part.a8'),
        dataIndex: 'handName',
        ellipsis: true,
        width: 100
    }, {
        title: utils.getText('part.a2'),
        dataIndex: 'name',
        width: 140,
        ellipsis: true
    }, {
        title: utils.getText('part.a9'),
        dataIndex: 'note',
        ellipsis: true,
        width: 140,
        render: (val, record) => {
            if (record.options && record.options.length) {
               return (
                   <Application list={record.options}>
                       <span className={'ellipsis-text'} title={val}>{val}</span>
                   </Application>
               );
            } else {
                return <span title={val}>{val}</span>;
            }
        }
    }, {
        title: utils.getText('part.a10'),
        dataIndex: 'formattedQty',
        ellipsis: true,
        width: 60
    }, {
        title: utils.getText('operate.a5'),
        ellipsis: true,
        width: 80,
        render: (val, record) => (
            <Tooltip title={utils.getText('operate.a4')}>
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
            enable={props.isShowParts ? {left: true} : {left: false}}
            onResizeStop={handleResize}
            className={styles.partsWrapper}
            style={{marginRight: props.isShowParts ? '0' : -(width + 10) + 'px'}}
        >
            <div className={styles.parts}>
                <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                    <Table columns={columns}
                           dataSource={usages}
                           className={usages.length > 0 ? 'part-list hide-select-column' : 'part-list hide-select-column empty-table'}
                           rowKey={'id'}
                           size={'small'}
                           scroll={{
                               y: styles.tableBodyHeight
                           } as any}
                           tableLayout={'fixed'}
                           pagination={false}
                           locale={{
                               emptyText: <NoData type={'list'} />
                           }}
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

import React, {useEffect} from 'react';
import {Button, Table, Tooltip, message} from 'antd';
import {ShoppingCartOutlined, CopyOutlined, RetweetOutlined, RightOutlined, LeftOutlined} from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import {useSelector, useDispatch} from 'react-redux';
import {Panel} from '@/components/panel';
import {Application} from '@/pages/common/application';
import styles from './Parts.module.scss';
import {partsCreator} from './actions';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {Resizable} from 're-resizable';
import {useUtils} from '@/hooks';
import {NoData} from '@/components/no-data';
import scrollIntoView from 'scroll-into-view-if-needed';
import {Buy} from '@/pages/common/buy';

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
        width,
        isScrollIntoView
    } = useSelector((state: any) => {
        return state.parts;
    });
    const groupsWidth = useSelector((state: any) => {
        return state.groups.width;
    });
    const usages = parts.usages || [];
    const utils = useUtils();
    const resizeHandle = document.querySelector('.resize-handle-left');

    useEffect(() => {
        if (props.activeCallout) {
            const keys = getKeysByCallout(props.activeCallout);
            dispatch(partsCreator.setSelectedKeys(keys));
            if (isScrollIntoView) {
                doScrollIntoView();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.activeCallout, isPartsLoading]);


    function showPartDetail(e, partCode) {
        e.stopPropagation();
        dispatch(partDetailCreator.loadAndShowPartDetail({
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
            partCode: partCode
        }));
        setTimeout(() => {
            dispatch(partDetailCreator.setActiveTab({
                activeTab: 'replace'
            }));
        }, 200);
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

    function doScrollIntoView() {
        setTimeout(() => {
            const nodes: any = document.querySelectorAll('.part-list .ant-table-row-selected');
            if (nodes && nodes.length > 0) {

                scrollIntoView(nodes[0], {
                    scrollMode: 'if-needed',
                    block: 'nearest',
                    inline: 'nearest'
                });

                if (nodes.length - 1 !== 0) {
                    scrollIntoView(nodes[nodes.length - 1], {
                        scrollMode: 'if-needed',
                        block: 'nearest',
                        inline: 'nearest'
                    });
                }
            }
        }, 200);
    }

    function handleResize(e, direction, ref, delta) {
        if (resizeHandle) {
            resizeHandle.className = 'resize-handle-left';
        }
        dispatch(partsCreator.setWidth({
            width: width + delta.width
        }));
    }

    const columns = [{
        title: '#',
        dataIndex: 'callout',
        className: 'row-number',
        width: 40,
        ellipsis: true
    }, {
        title: utils.getText('part.a1'),
        dataIndex: 'partCode',
        width: 165,
        ellipsis: true,
        render: (val, record) => {
            return (
                <div className="operator-wrapper">
                    <span className="link-button" onClick={(e) => {
                        showPartDetail(e, val);
                    }} title={val}>{val}</span>
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
                        {
                            record.price && <Tooltip title={record.price}>
                                <i className={'iconfont icon-money'}/>
                            </Tooltip>
                        }
                        {
                            record.cart && <Tooltip title={utils.getText('cart.a7')}>
                                <i className={'iconfont icon-add-cart'}/>
                            </Tooltip>
                        }
                    </span>
                </div>
            );
        }
    }, {
        title: utils.getText('part.a8'),
        dataIndex: 'handName',
        ellipsis: true,
        width: 45
    }, {
        title: utils.getText('part.a2'),
        dataIndex: 'name',
        width: 180,
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
        width: 50
    }, {
        title: utils.getText('operate.a5'),
        ellipsis: true,
        width: 60,
        render: (val, record) => (
            <Buy partCode={record.partCode} checkContainerScroll={true}
                 containerSelector={'#parts-table-container div.ant-table-body'}>
                <Button type="primary" title={utils.getText('operate.a4')}
                        icon={<ShoppingCartOutlined/>}
                        size={'small'}/>
            </Buy>
        )
    }];

    return (
        <Resizable
            minWidth={400}
            maxWidth={window.innerWidth - groupsWidth - 295}
            defaultSize={{width: width, height: window.innerHeight - 100}}
            enable={props.isShowParts ? {left: true} : {left: false}}
            className={styles.partsWrapper}
            style={{marginRight: props.isShowParts ? '0' : -(width + 10) + 'px'}}
            handleWrapperClass={'resize-handle-left'}
            onResizeStart={() => {
                if (resizeHandle) {
                    resizeHandle.className = 'resize-handle-left active';
                }
            }}
            onResizeStop={handleResize}
        >
            <div className={styles.parts} id={'parts-table-container'}>
                <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                    <Table columns={columns as any}
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
                               emptyText: <NoData type={'list'}/>
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

import React, {useEffect, useRef, Ref, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import classnames from 'classnames';
import {Tree} from 'antd';
import {API_PREFIX} from '@/config';
import {Panel} from '@/components/panel';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {groupsCreator, legendsCreator, partsCreator, usageCreator} from './actions';
import {Parts} from './parts';
import styles from './usage.module.scss';

const TreeNode = Tree.TreeNode;
const imageSuffix = '?/d/300';
const svgPrefix = '/res';

export function PageUsage() {
    const svgHotPointRef: any = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const {
        groups,
        isGroupsLoading,
        activeTreeNodeCode,
        isShowParts,
        legends,
        parts
    } = useSelector((state: any) => {
        return state.usage;
    });
    const {
        resHost
    } = useSelector((state: any) => {
        return state.auth;
    });

    useEffect(() => {
        const queryObj = queryString.parse(location.search);
        dispatch(groupsCreator.load(queryObj));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    function handleClickTreeNode(e, node) {
        let queryObj = queryString.parse(location.search);
        let result = {};
        const nodeCode = node.props.eventKey;
        // let codes = params.parentCodes;

        dispatch(usageCreator.setActiveCodes({
            activeTreeNodeCode: nodeCode
        }));

        if (node.isLeaf()) {
            handleClickLegend({
                code: nodeCode,
                parentCodes: []
            });
        } else {
            let queryObj = queryString.parse(location.search);

            dispatch(usageCreator.setIsShowParts(false));
            queryObj.s_1 = nodeCode;
            dispatch(legendsCreator.load(queryObj));
        }

        return false;
    }

    function handleClickLegend(params) {
        const queryObj = queryString.parse(location.search);
        const codes = params.parentCodes;
        let result = {};

        dispatch(usageCreator.setActiveCodes({
            activeTreeNodeCode: params.code
        }));
        dispatch(usageCreator.setIsShowParts(true));

        codes.forEach((item, index) => {
            const key = 's_' + (index + 1);
            result[key] = item;
        });

        if (svgHotPointRef && svgHotPointRef.current) {
            svgHotPointRef.current.loadSVG(API_PREFIX + svgPrefix + params.svgFileUri);
            // svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        }

        dispatch(partsCreator.load(Object.assign({}, queryObj, result)));
    }

    function legendLoadedHandler() {
        console.log('onLegendLoaded');
    }

    function selectCalloutHandler(callout) {
        console.log(callout);
    }

    function renderTreeNodes(list: any) {
        return list.map(item => {
            const title = item.code + ' - ' + item.text;
            if (item.children) {
                return (
                    <TreeNode title={title} key={item.code}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={title} key={item.code}></TreeNode>;
        });
    }

    return (
        <>
            <div className={classnames(['inner-container', styles.container])}>
                <Panel isLoading={isGroupsLoading} title={'组别'} className={'panel-tree'}>
                    <Tree showLine
                          style={{width: '238px'}}
                          defaultSelectedKeys={[activeTreeNodeCode]}
                          selectedKeys={[activeTreeNodeCode]}
                          onClick={handleClickTreeNode}
                    >
                        {
                            renderTreeNodes(groups)
                        }
                    </Tree>
                </Panel>
                {
                    !isShowParts && <div className="panel panel-legend-list">
                        <div className="panel-content">
                            <ul className="legend-list">
                                {
                                    legends && legends.map((item) => {
                                        return (
                                            <li className="item"
                                                key={item.code}
                                                onClick={handleClickLegend.bind(null, {
                                                    code: item.code,
                                                    parentCodes: item.parentIds,
                                                    svgFileUri: item.svgFileUri
                                                })}>
                                                <span className="image-wrapper"><img src={resHost + item.imageFileUri + imageSuffix} alt={item.text}/></span>
                                                <span className="text">{item.code} - {item.text}</span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                }

                <div className="panel panel-legend" style={{display: isShowParts ? 'flex' : 'none'}}>
                    <SvgHotPoint
                        ref={svgHotPointRef}
                        onLegendLoaded={legendLoadedHandler}
                        onSelectCallout={selectCalloutHandler}
                    />
                </div>

                {
                    isShowParts && <div className="panel panel-part-list">
                        <Parts data={parts.usages} />
                    </div>
                }
            </div>
        </>
    );
}

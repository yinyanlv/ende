import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import queryString from 'query-string';
import cls from 'classnames';
import Img from 'react-image';
import {Tree, Icon} from 'antd';
import {API_PREFIX} from '@/config';
import {updateLocationSearch} from '@/common/utils';
import {Panel} from '@/components/panel';
import {SvgHotPoint} from '@/components/svg-hot-point';
import {crumbsText} from '@/pages/common/crumbs/reducer';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {groupsCreator, legendsCreator, partsCreator, usageCreator} from './actions';
import {Parts} from './parts';
import styles from './usage.module.scss';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;
const imageSuffix = '?/d/300';
const svgPrefix = '/res';

export function PageUsage() {
    const svgHotPointRef: any = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const {
        groups,
        isGroupsLoading,
        activeTreeNodeCode,
        isShowParts,
        isLegendsLoading,
        legends,
        isPartsLoading,
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
        const queryObj = getCleanQueryObj();
        dispatch(groupsCreator.load(queryObj));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);


    function handleClickTreeNode(e, node) {
        const nodeCode = node.props.eventKey;
        const codes = node.props['data-code-path'].split('/');
        const codesMap = rebuildCodes(codes);

        e.persist();
        if (activeTreeNodeCode === nodeCode) {
            return;
        }
        dispatch(usageCreator.setActiveCodes({
            activeTreeNodeCode: nodeCode
        }));

        if (node.isLeaf()) {
            handleClickLegend({
                code: nodeCode,
                codePathList: codes
            });
        } else {
            const queryObj = getCleanQueryObj();
            const params = Object.assign({}, queryObj, codesMap);

            dispatch(usageCreator.setIsShowParts(false));
            dispatch(legendsCreator.load(params));
            dispatch(crumbsCreator.load(params));
            updateLocationSearch(params);
        }
    }

    function getCleanQueryObj() {
        const queryObj = queryString.parse(location.search);
        let result = {};

        Object.keys(queryObj).forEach((key) => {
            if (!key.startsWith('s_')) {
                result[key] = queryObj[key];
            }
        });

        return result;
    }

    function handleClickLegend(params) {
        const queryObj = getCleanQueryObj();
        const codes = params.codePathList;
        const codesMap = rebuildCodes(codes);

        dispatch(usageCreator.setActiveCodes({
            activeTreeNodeCode: params.code
        }));
        dispatch(usageCreator.setIsShowParts(true));
        loadSvg(params.svgFileUri);
        const temp = Object.assign({}, queryObj, codesMap);
        dispatch(partsCreator.load(temp));
        dispatch(crumbsCreator.load(temp));
        updateLocationSearch(temp);
    }

    function loadSvg(svgUrl) {
        if (svgHotPointRef && svgHotPointRef.current && svgUrl) {
            svgHotPointRef.current.loadSVG(API_PREFIX + svgPrefix + svgUrl);
        } else {
            // svgHotPointRef.current.loadDefaultImg();
            svgHotPointRef.current.loadSVG('/images/A-0001.svg');
        }
    }

    function rebuildCodes(codes) {
        let result = {};

        codes.forEach((item, index) => {
            const key = 's_' + (index + 1);
            result[key] = item;
        });

        return result;
    }

    function legendLoadedHandler() {
        console.log('onLegendLoaded');
    }

    function selectCalloutHandler(callout) {
        console.log(callout);
    }

    function renderTreeNodes(list: any, codePathStr = '') {
        return list.map(item => {
            const title = item.code + ' - ' + item.text;
            const tempCodePathStr = codePathStr ? codePathStr + '/' + item.code : item.code;
            if (item.children && item.children.length) {
                return (
                    <TreeNode title={title} key={item.code} data-code-path={tempCodePathStr}>
                        {renderTreeNodes(item.children, tempCodePathStr)}
                    </TreeNode>
                );
            }
            return <TreeNode icon={<Icon type="profile"/>} title={title} key={item.code}
                             data-code-path={tempCodePathStr}></TreeNode>;
        });
    }

    return (
        <>
            <div className={cls(['inner-container', styles.container])}>
                <Panel isLoading={isGroupsLoading} title={crumbsText.s_1} className={'panel-tree'}>
                    <DirectoryTree
                        expandAction="click"
                        autoExpandParent={true}
                        style={{width: '238px'}}
                        defaultSelectedKeys={[activeTreeNodeCode]}
                        selectedKeys={[activeTreeNodeCode]}
                        onClick={handleClickTreeNode}
                    >
                        {
                            renderTreeNodes(groups)
                        }
                    </DirectoryTree>
                </Panel>
                {
                    !isShowParts &&
                    <Panel isLoading={isLegendsLoading} mode={'empty'} className={'panel-legend-list'}>
                        <div className="panel-content">
                            <ul className="legend-list">
                                {
                                    legends && legends.map((item) => {
                                        return (
                                            <li className="item"
                                                key={item.code}
                                                onClick={handleClickLegend.bind(null, {
                                                    code: item.code,
                                                    codePathList: item.parentIds,
                                                    svgFileUri: item.svgFileUri
                                                })}>
                                                <span className="image-wrapper">
                                                    <Img
                                                        src={[resHost + item.imageFileUri + imageSuffix, '/images/nopic.gif']}
                                                        alt={item.text}
                                                    />
                                                </span>
                                                <span className="text">{item.code} - {item.text}</span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </Panel>
                }

                <div className="panel panel-legend" style={{display: isShowParts ? 'flex' : 'none'}}>
                    <SvgHotPoint
                        ref={svgHotPointRef}
                        noPicPath={'/images/nopic.gif'}
                        onLegendLoaded={legendLoadedHandler}
                        onSelectCallout={selectCalloutHandler}
                    />
                </div>

                {
                    isShowParts &&
                    <Panel isLoading={isPartsLoading} mode={'empty'} className={'panel-part-list'}>
                        <Parts data={parts.usages}/>
                    </Panel>
                }
            </div>
        </>
    );
}

import React, {HTMLProps} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import {Tree} from 'antd';
import {Resizable} from 're-resizable';
import {Panel} from '@/components/panel';
import {usageCreator} from '@/pages/usage/actions';
import {legendsCreator} from '@/pages/usage/legends/actions';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {updateLocationSearch, getMQueryObj} from '@/common/utils';
import {groupsCreator} from './actions';
import styles from './Groups.module.scss';

const DirectoryTree = Tree.DirectoryTree;

const TreeNode = Tree.TreeNode;

interface GroupsProps extends HTMLProps<HTMLDivElement> {
    isFirstLoad: boolean;
    isShowGroups: boolean;
    onClickTreeNode: Function;
}

function Groups(props: GroupsProps) {

    const dispatch = useDispatch();
    const intl = useIntl();
    const {
        groups,
        isGroupsLoading,
        activeTreeNodeCode,
        expandedTreeNodeCodes,
        width
    } = useSelector((state: any) => {
        return state.groups;
    });
    const partsWidth = useSelector((state: any) => {
        return state.parts.width;
    });

    function handleClickTreeNode(e, node) {
        // e.persist();
        if (node.children && node.children.length) {
            handleClickParentNode(node);
        } else {
            handleClickChildNode(node);
        }
    }

    function handleClickChildNode(node) {
        const nodeKey = node.key;
        const nodeInfo = getNodeInfo(nodeKey);

        dispatch(groupsCreator.setActiveTreeNodeCode(nodeInfo.code));

        // if (!props.isFirstLoad && (activeTreeNodeCode === nodeCode)) {
        //     return;
        // }

        props.onClickTreeNode(nodeInfo);
    }

    function handleClickParentNode(node) {
        const nodeKey = node.key;
        const nodeInfo = getNodeInfo(nodeKey);
        const codes = nodeInfo.codePathList;
        const codesMap = rebuildCodes(codes);

        dispatch(groupsCreator.setActiveTreeNodeCode(nodeInfo.code));
        const expandedCodes = node.expanded
            ? expandedTreeNodeCodes.filter(code => code !== nodeInfo.code)
            : expandedTreeNodeCodes.concat(nodeInfo.code);

        dispatch(groupsCreator.setExpandedTreeNodeCodes(expandedCodes));

        if (!props.isFirstLoad && (activeTreeNodeCode === nodeInfo.code)) {
            return;
        }

        const queryObj = getMQueryObj();
        const params = Object.assign({}, queryObj, codesMap);

        dispatch(usageCreator.setIsShowLegendParts(false));
        dispatch(legendsCreator.load(params));
        dispatch(crumbsCreator.load(params));
        updateLocationSearch(params);
    }

    function getNodeInfo(nodeKey) {
        for (let i = 0; i < groups.length; i++) {
            const temp = groups[i];
            if (temp.key === nodeKey) {
                const codeList = temp.codePathStr.split('/');
                return {
                    code: temp.key,
                    codePathList: codeList,
                    svgUri: temp.svgFileUri,
                };
            }
            const children = groups[i].children;
            for (let j = 0; j < children.length; j++) {
                const item = children[j];
                if (item.key === nodeKey) {
                    const codeList = item.codePathStr.split('/');
                    return {
                        code: item.key,
                        codePathList: codeList,
                        svgUri: item.svgFileUri,
                    };
                }
            }
        }

        return {};
    }

    function rebuildCodes(codes) {
        let result = {};

        codes.forEach((item, index) => {
            const key = 's_' + (index + 1);
            result[key] = item;
        });

        return result;
    }

    function handleResize(e, direction, ref, delta) {
        dispatch(groupsCreator.setWidth({
            width: width + delta.width
        }));
    }

    function handleExpand(expandedKeys, meta) {
        handleClickParentNode(meta.node);
    }

    function renderTreeNodes(list: any) {

        return list.map(item => {
            if (!item.leaf) {
                return (
                    <TreeNode active={false} title={item.title} key={item.key}>
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    icon={<span className={'icon-dot-wrapper'}><i className="icon-child-dot"></i></span>}
                    title={item.title}
                    key={item.key}
                    active={false}
                />
            );
        });
    }

    return (
        <Resizable
            minWidth={150}
            maxWidth={window.innerWidth - partsWidth - 295}
            defaultSize={{width: width, height: window.innerHeight - 100}}
            enable={{right: true}}
            onResizeStop={handleResize}
            style={{marginLeft: props.isShowGroups ? '0' : -(width + 10) + 'px'}}
        >
            <Panel isLoading={isGroupsLoading} title={intl.formatMessage({
                id: 'crumbs.s_1'
            })} className={styles.groups}>
                <DirectoryTree
                    className={'panel-tree'}
                    expandAction="click"
                    defaultExpandAll={true}
                    defaultExpandedKeys={expandedTreeNodeCodes}
                    expandedKeys={expandedTreeNodeCodes}
                    defaultSelectedKeys={[activeTreeNodeCode]}
                    selectedKeys={[activeTreeNodeCode]}
                    onClick={handleClickTreeNode}
                    onExpand={handleExpand}
                >
                    {
                        renderTreeNodes(groups)
                    }
                </DirectoryTree>
            </Panel>
        </Resizable>
    );
}

export default React.memo(Groups);

import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Tree} from 'antd';
import {crumbsText} from '@/pages/common/crumbs/reducer';
import {Panel} from '@/components/panel';
import {legendsCreator, usageCreator} from '@/pages/usage/actions';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {updateLocationSearch, getCleanQueryObj} from '@/common/utils';
import {groupsCreator} from './actions';
import './Groups.module.scss';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

interface GroupsProps {
    onClickTreeNode: Function;
}

function Groups(props: GroupsProps) {

    const dispatch = useDispatch();
    const {
        groups,
        isGroupsLoading,
        activeTreeNodeCode,
        expandedTreeNodeCodes
    } = useSelector((state: any) => {
        return state.groups;
    });

    function handleClickTreeNode(e, node) {
        const nodeCode = node.props.eventKey;
        const codes = node.props['data-code-path'].split('/');
        const codesMap = rebuildCodes(codes);

        e.persist();
        if (activeTreeNodeCode === nodeCode) {
            return;
        }

        dispatch(groupsCreator.setActiveTreeNodeCode(nodeCode));

        if (node.isLeaf()) {
            const svgUrl = node.props['data-svg-url'];

            props.onClickTreeNode({
                code: nodeCode,
                codePathList: codes,
                svgUri: svgUrl
            });
        } else {
            const queryObj = getCleanQueryObj();
            const params = Object.assign({}, queryObj, codesMap);

            const expandedCodes = node.props.expanded
                ? expandedTreeNodeCodes.filter(code => code !== node.props.eventKey)
                : expandedTreeNodeCodes.concat(node.props.eventKey);

            dispatch(groupsCreator.setExpandedTreeNodeCodes(expandedCodes));
            dispatch(usageCreator.setIsShowParts(false));
            dispatch(legendsCreator.load(params));
            dispatch(crumbsCreator.load(params));
            updateLocationSearch(params);
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

    function renderTreeNodes(list: any, codePathStr = '') {
        return list.map(item => {
            const title = item.code + ' - ' + item.text;
            const tempCodePathStr = codePathStr ? codePathStr + '/' + item.code : item.code;
            if (!item.leaf) {
                return (
                    <TreeNode title={title} key={item.code} data-code-path={tempCodePathStr}>
                        {renderTreeNodes(item.children, tempCodePathStr)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    icon={<Icon type="profile"/>}
                    title={title}
                    key={item.code}
                    data-code-path={tempCodePathStr}
                    data-svg-url={item.svgFileUri}
                />
            );
        });
    }

    return (
        <Panel isLoading={isGroupsLoading} title={crumbsText.s_1} className={'panel-tree'}>
            <DirectoryTree
                expandAction="click"
                style={{width: '238px'}}
                defaultExpandAll={true}
                defaultExpandedKeys={expandedTreeNodeCodes}
                expandedKeys={expandedTreeNodeCodes}
                defaultSelectedKeys={[activeTreeNodeCode]}
                selectedKeys={[activeTreeNodeCode]}
                onClick={handleClickTreeNode}
            >
                {
                    renderTreeNodes(groups)
                }
            </DirectoryTree>
        </Panel>
    );
}

export default React.memo(Groups);
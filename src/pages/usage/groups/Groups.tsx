import React, {HTMLProps} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useIntl} from 'react-intl';
import {Tree} from 'antd';
import {Panel} from '@/components/panel';
import {usageCreator} from '@/pages/usage/actions';
import {legendsCreator} from '@/pages/usage/legends/actions';
import {crumbsCreator} from '@/pages/common/crumbs/actions';
import {updateLocationSearch, getMQueryObj} from '@/common/utils';
import {groupsCreator} from './actions';
import './Groups.module.scss';

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
        expandedTreeNodeCodes
    } = useSelector((state: any) => {
        return state.groups;
    });

    function handleClickTreeNode(e, node) {
        const nodeCode = node.key;
        const codes = node['data-code-path'].split('/');
        const codesMap = rebuildCodes(codes);

        e.persist();

        dispatch(groupsCreator.setActiveTreeNodeCode(nodeCode));

        if (!node.children) {

            if (!props.isFirstLoad && (activeTreeNodeCode === nodeCode)) {
                return;
            }

            const svgUrl = node['data-svg-url'];

            props.onClickTreeNode({
                code: nodeCode,
                codePathList: codes,
                svgUri: svgUrl
            });
        } else {
            const expandedCodes = node.expanded
                ? expandedTreeNodeCodes.filter(code => code !== node.key)
                : expandedTreeNodeCodes.concat(node.key);

            dispatch(groupsCreator.setExpandedTreeNodeCodes(expandedCodes));

            if (!props.isFirstLoad && (activeTreeNodeCode === nodeCode)) {
                return;
            }

            const queryObj = getMQueryObj();
            const params = Object.assign({}, queryObj, codesMap);

            dispatch(usageCreator.setIsShowLegendParts(false));
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
                    <TreeNode active={false} title={title} key={item.code} data-code-path={tempCodePathStr}>
                        {renderTreeNodes(item.children, tempCodePathStr)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    icon={<span className={'icon-dot-wrapper'}><i className="icon-dot"></i></span>}
                    title={title}
                    key={item.code}
                    active={false}
                    data-code-path={tempCodePathStr}
                    data-svg-url={item.svgFileUri}
                />
            );
        });
    }

    return (
        <Panel isLoading={isGroupsLoading} title={intl.formatMessage({
            id: 'crumbs.s_1'
        })} className={'panel-tree'} style={{marginLeft: props.isShowGroups ? '0' : '-260px'}}>
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

import {createAction} from '@/common/utils';

export const LOAD_GROUPS = 'usage:load-groups';
export const LOAD_GROUPS_SUCCESS = 'usage:load-groups-success';
export const LOAD_GROUPS_FAILED = 'usage:load-groups-failed';

export const SET_ACTIVE_TREE_NODE_CODE = 'usage:set-active-tree-node-code';
export const SET_EXPANDED_TREE_NODE_CODES = 'usage:set-expanded-tree-node-codes';

export const groupsCreator = {
    load: (params) => {
        return createAction(LOAD_GROUPS, params);
    },
    success: (data) => {
        return createAction(LOAD_GROUPS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_GROUPS_FAILED, message);
    },
    setActiveTreeNodeCode: (params) => {
        return createAction(SET_ACTIVE_TREE_NODE_CODE, params);
    },
    setExpandedTreeNodeCodes: (params) => {
        return createAction(SET_EXPANDED_TREE_NODE_CODES, params);
    },
};
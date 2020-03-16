import {createAction} from '@/common/utils';

export const LOAD_GROUPS = 'usage:load-groups';
export const LOAD_GROUPS_SUCCESS = 'usage:load-groups-success';
export const LOAD_GROUPS_FAILED = 'usage:load-groups-failed';

export const RESET_GROUPS = 'usage:reset-groups';
export const SET_ACTIVE_TREE_NODE_CODE = 'usage:set-active-tree-node-code';
export const SET_EXPANDED_TREE_NODE_CODES = 'usage:set-expanded-tree-node-codes';
export const SET_WIDTH = 'usage:set-width';

export const groupsCreator = {
    resetGroups: function () {
        return createAction(RESET_GROUPS);
    },
    load: () => {
        return createAction(LOAD_GROUPS);
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
    setWidth: (params) => {
        return createAction(SET_WIDTH, params);
    }
};

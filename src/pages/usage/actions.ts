import {createAction} from '@/common/utils';

export const RESET_STATE = 'usage:reset-state';
export const SET_ACTIVE_TREE_NODE_CODE = 'usage:set-active-tree-node-code';
export const SET_EXPANDED_TREE_NODE_CODES = 'usage:set-expanded-tree-node-codes';
export const SET_ACTIVE_CALLOUT = 'usage:set-active-callout';
export const CONTROL_LEGEND_SHOW = 'usage:control-legend-show';

export const LOAD_GROUPS = 'usage:load-groups';
export const LOAD_GROUPS_SUCCESS = 'usage:load-groups-success';
export const LOAD_GROUPS_FAILED = 'usage:load-groups-failed';

export const LOAD_LEGENDS = 'usage:load-legends';
export const LOAD_LEGENDS_SUCCESS = 'usage:load-legends-success';
export const LOAD_LEGENDS_FAILED = 'usage:load-legends-failed';

export const LOAD_PARTS = 'usage:load-parts';
export const LOAD_PARTS_SUCCESS = 'usage:load-parts-success';
export const LOAD_PARTS_FAILED = 'usage:load-parts-failed';

export const usageCreator = {
    resetState: () => {
        return createAction(RESET_STATE);
    },
    setActiveTreeNodeCode: (params) => {
        return createAction(SET_ACTIVE_TREE_NODE_CODE, params);
    },
    setExpandedTreeNodeCodes: (params) => {
        return createAction(SET_EXPANDED_TREE_NODE_CODES, params);
    },
    setActiveCallout: (params) => {
        return createAction(SET_ACTIVE_CALLOUT, params);
    },
    setIsShowParts: (params) => {
        return createAction(CONTROL_LEGEND_SHOW, params);
    }
};

export const groupsCreator = {
    load: (params) => {
        return createAction(LOAD_GROUPS, params);
    },
    success: (data) => {
        return createAction(LOAD_GROUPS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_GROUPS_FAILED, message);
    }
};

export const legendsCreator = {
    load: (params) => {
        return createAction(LOAD_LEGENDS, params);
    },
    success: (data) => {
        return createAction(LOAD_LEGENDS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_LEGENDS_FAILED, message);
    }
};

export const partsCreator = {
    load: (params) => {
        return createAction(LOAD_PARTS, params);
    },
    success: (data) => {
        return createAction(LOAD_PARTS_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_PARTS_FAILED, message);
    }
};

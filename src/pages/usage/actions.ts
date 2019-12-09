import {createAction} from '@/common/utils';

export const RESET_STATE = 'usage:reset-state';
export const SET_ACTIVE_CODES = 'usage:set-active-codes';

export const LOAD_GROUP = 'usage:load-group';
export const LOAD_GROUP_SUCCESS = 'usage:load-group-success';
export const LOAD_GROUP_FAILED = 'usage:load-group-failed';

export const usageCreator = {
    resetState: () => {
        return createAction(RESET_STATE);
    },
    setActiveCodes: (params) => {
        return createAction(SET_ACTIVE_CODES, rebuildActiveCodes(params));
    }
};

function rebuildActiveCodes(params) {
    let obj = {};
    Object.keys(params).forEach((key) => {
        const newKey = 'activeM'+ key.replace('m_', '') +'Code';
        obj[newKey] = params[key];
    });
    return obj;
}

export const groupCreator = {
    load: (params?) => {
        return createAction(LOAD_GROUP, params);
    },
    success: (data) => {
        return createAction(LOAD_GROUP_SUCCESS, data);
    },
    failed: (message) => {
        return createAction(LOAD_GROUP_FAILED, message);
    }
};

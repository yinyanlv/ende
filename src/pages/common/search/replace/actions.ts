import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:replace:do-query';
export const IS_LOADING = 'search:replace:is-loading';
export const SET_REPLACE = 'search:replace:set-replace';
export const SET_PART_CODE = 'search:replace:set-part-code';
export const RESET_STATE = 'search:replace:reset-state';
export const RESET_CHILDREN_STATE = 'search:replace:reset-children-state';

export const replaceCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    setPartCode: (params) => {
        return createAction(SET_PART_CODE, params)
    },
    setReplace: (params) => {
        return createAction(SET_REPLACE, params);
    },
    resetState: () => {
        return createAction(RESET_STATE);
    },
    resetChildrenState: () => {
        return createAction(RESET_CHILDREN_STATE);
    }
};

import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:parts:do-query';
export const SET_PARTS = 'search:advance-search:parts:set-parts';
export const IS_LOADING = 'search:advance-search:parts:is-loading';
export const RESET_STATE = 'search:advance-search:parts:reset-state';

export const partsCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setParts: (params) => {
        return createAction(SET_PARTS, params);
    },
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    resetState: () => {
        return createAction(RESET_STATE);
    }
};

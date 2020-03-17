import {createAction} from '@/common/utils';

export const SET_QUERY_PARAMS = 'search:advance-search:set-query-params';
export const LOAD_COUNT = 'search:advance-search:load-count';
export const SET_COUNT = 'search:advance-search:set-count';
export const DO_QUERY = 'search:advance-search:do-query';
export const RESET_STATE = 'search:advance-search:reset-state';

export const advanceSearchCreator = {
    setQueryParams: (params) => {
        return createAction(SET_QUERY_PARAMS, params);
    },
    loadCount: (params) => {
        return createAction(LOAD_COUNT, params);
    },
    setCount: (params) => {
        return createAction(SET_COUNT, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    resetState: () => {
        return createAction(RESET_STATE);
    }
};


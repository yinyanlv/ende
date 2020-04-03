import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:applicability:do-query';
export const SET_APPLICABILITY = 'search:advance-search:applicability:set-applicability';
export const IS_LOADING = 'search:advance-search:applicability:is-loading';
export const RESET_STATE = 'search:advance-search:applicability:reset-state';
export const SET_SELECTED_KEYS = 'search:advance-search:applicability:set-select-keys';
export const UPDATE_RECORDS = 'search:advance-search:applicability:update-records';

export const applicabilityCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setApplicability: (params) => {
        return createAction(SET_APPLICABILITY, params);
    },
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    resetState: () => {
        return createAction(RESET_STATE);
    },
    setSelectedKeys: (params) => {
        return createAction(SET_SELECTED_KEYS, params);
    },
    updateRecords: (params) => {
        return createAction(UPDATE_RECORDS, params);
    }
};

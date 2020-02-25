import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:legends:do-query';
export const SET_LEGENDS = 'search:advance-search:legends:set-legends';
export const IS_LOADING = 'search:advance-search:legends:is-loading';

export const legendsCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setLegends: (params) => {
        return createAction(SET_LEGENDS, params);
    },
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    }
};

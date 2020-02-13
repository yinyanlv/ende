import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:legends:do-query';
export const SET_LEGENDS = 'search:advance-search:legends:set-legends';

export const legendsCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setLegends: (params) => {
        return createAction(SET_LEGENDS, params);
    }
};
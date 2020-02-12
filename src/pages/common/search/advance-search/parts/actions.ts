import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:parts:do-query';
export const SET_PARTS = 'search:advance-search:parts:set-parts';

export const partsCreator = {
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setParts: (params) => {
        return createAction(SET_PARTS, params);
    }
};
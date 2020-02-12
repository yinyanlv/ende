import {createAction} from '@/common/utils';

export const LOAD_GROUP = 'search:advance-search:query:load-group';
export const SET_GROUP = 'search:advance-search:query:set-group';
export const DO_QUERY = 'search:advance-search:query';

export const queryCreator = {
    loadGroup: () => {
        return createAction(LOAD_GROUP);
    },
    setGroup: (list) => {
        return createAction(SET_GROUP, list);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    }
};

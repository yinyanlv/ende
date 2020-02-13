import {createAction} from '@/common/utils';

export const DO_QUERY = 'search:advance-search:query:do-query';
export const LOAD_GROUP = 'search:advance-search:query:load-group';
export const SET_GROUP = 'search:advance-search:query:set-group';
export const LOAD_M1 = 'search:advance-search:query:load-m1';
export const LOAD_M2 = 'search:advance-search:query:load-m2';
export const LOAD_M3 = 'search:advance-search:query:load-m3';
export const LOAD_M4 = 'search:advance-search:query:load-m4';
export const SET_M1 = 'search:advance-search:query:set-m1';
export const SET_M2 = 'search:advance-search:query:set-m2';
export const SET_M3 = 'search:advance-search:query:set-m3';
export const SET_M4 = 'search:advance-search:query:set-m4';

export const queryCreator = {
    loadGroup: () => {
        return createAction(LOAD_GROUP);
    },
    setGroup: (list) => {
        return createAction(SET_GROUP, list);
    },
    loadM1: () => {
        return createAction(LOAD_M1);
    },
    setM1: (list) => {
        return createAction(SET_M1, list);
    },
    loadM2: (params) => {
        return createAction(LOAD_M2, params);
    },
    setM2: (list) => {
        return createAction(SET_M2, list);
    },
    loadM3: (params) => {
        return createAction(LOAD_M3, params);
    },
    setM3: (list) => {
        return createAction(SET_M3, list);
    },
    loadM4: (params) => {
        return createAction(LOAD_M4, params);
    },
    setM4: (list) => {
        return createAction(SET_M4, list);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    }
};

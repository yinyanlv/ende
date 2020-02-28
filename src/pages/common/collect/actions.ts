import {createAction} from '@/common/utils';

export const DO_QUERY = 'collect:do-query';
export const IS_SHOW_COLLECT = 'collect:is-show-collect';
export const IS_LOADING = 'collect:is-loading';
export const SET_COLLECT = 'collect:set-collect';
export const SET_SELECTED_RECORDS = 'collect:set-selected-records';
export const ADD_TO_COLLECT = 'collect:add-to-collect';
export const EDIT_ITEM = 'collect:edit-item';
export const DELETE_FROM_COLLECT = 'collect:delete-from-collect';

export const collectCreator = {
    setIsShowCollect: (params) => {
        return createAction(IS_SHOW_COLLECT, params);
    },
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    setSelectedRecords: (params) => {
        return createAction(SET_SELECTED_RECORDS, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setCollect: (params) => {
        return createAction(SET_COLLECT, params);
    },
    addToCollect: (params) => {
        return createAction(ADD_TO_COLLECT, params);
    },
    deleteFromCollect: (params) => {
        return createAction(DELETE_FROM_COLLECT, params);
    },
    editItem: (params) => {
        return createAction(EDIT_ITEM, params);
    }
};

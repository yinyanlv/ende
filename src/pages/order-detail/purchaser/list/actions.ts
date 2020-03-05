import {createAction} from '@/common/utils';

export const SET_IS_SHOW_LIST = 'order-detail:purchase:list:set-is-show-list';
export const SET_IS_LOADING = 'order-detail:purchase:list:set-is-loading';
export const SET_SELECTED_KEYS = 'order-detail:purchase:list:set-selected-keys';
export const LOAD_LIST = 'order-detail:purchaser:list:load-list';
export const SET_LIST = 'order-detail:purchaser:list:set-list';
export const SET_DEFAULT = 'order-detail:purchaser:list:set-default';
export const DELETE_RECORD = 'order-detail:purchaser:list:DELETE_RECORD';

export const listCreator = {
    setIsShowList: (params) => {
      return createAction(SET_IS_SHOW_LIST, params);
    },
    setIsLoading: (params) => {
        return createAction(SET_IS_LOADING, params);
    },
    loadList: () => {
        return createAction(LOAD_LIST);
    },
    setList: (params) => {
        return createAction(SET_LIST, params);
    },
    setDefault: (params) => {
        return createAction(SET_DEFAULT, params);
    },
    deleteRecord: (params) => {
        return createAction(DELETE_RECORD, params);
    },
    setSelectedKeys: (params) => {
        return createAction(SET_SELECTED_KEYS, params);
    }
};

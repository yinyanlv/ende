import {createAction} from '@/common/utils';

export const SET_INFO = 'order-detail:purchaser:set-info';
export const LOAD_PURCHASER_LIST = 'order-detail:purchaser:load-purchaser-list';
export const SET_PURCHASER_LIST = 'order-detail:purchaser:set-purchaser-list';
export const CREATE_PURCHASER = 'order-detail:purchaser:create-purchaser';
export const EDIT_PURCHASER = 'order-detail:purchaser:edit-purchaser';
export const SET_DEFAULT = 'order-detail:purchaser:set-default';

export const purchaserCreator = {
    createPurchaser: (params) => {
        return createAction(CREATE_PURCHASER, params);
    },
    editPurchaser: (params) => {
        return createAction(EDIT_PURCHASER, params);
    },
    setInfo: (params) => {
        return createAction(SET_INFO, params);
    },
    loadPurchaserList: (params) => {
        return createAction(LOAD_PURCHASER_LIST, params);
    },
    setPurchaserList: (params) => {
        return createAction(SET_PURCHASER_LIST, params);
    },
    setDefault: (params) => {
        return createAction(SET_DEFAULT, params);
    }
};

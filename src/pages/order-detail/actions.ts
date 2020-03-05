import {createAction} from '@/common/utils';

export const INIT_ORDER_DETAIL = 'order-detail:init-order-detail';
export const SET_ORDER_CODE = 'order-detail:set-order-code';
export const LOAD_INFO = 'order-detail:load-info';
export const SET_INFO = 'order-detail:set-info';
export const SAVE_AS_NEW_ORDER = 'order-detail:save-as-new-order';
export const EXPORT_ORDER = 'order-detail:export-order';
export const DELETE_ORDER = 'order-detail:delete-order';
export const SAVE_ORDER = 'order-detail:save-order';

export const orderDetailCreator = {
    initOrderDetail: (params) => {
        return createAction(INIT_ORDER_DETAIL, params);
    },
    setOrderCode: (params) => {
        return createAction(SET_ORDER_CODE, params);
    },
    loadInfo: (params) => {
        return createAction(LOAD_INFO, params);
    },
    setInfo: function (params) {
        return createAction(SET_INFO, params);
    },
    saveAsNewOrder: function(params) {
        return createAction(SAVE_AS_NEW_ORDER, params);
    },
    exportOrder: function(params) {
        return createAction(EXPORT_ORDER, params);
    },
    deleteOrder: function(params) {
        return createAction(DELETE_ORDER, params);
    },
    saveOrder: function(params) {
        return createAction(SAVE_ORDER, params);
    }
};

import {createAction} from '@/common/utils';

export const INIT_ORDER_DETAIL = 'order-detail:init-order-detail';

export const SET_ORDER_CODE = 'order-detail:set-order-code';
export const LOAD_INFO = 'order-detail:load-info';
export const SET_INFO = 'order-detail:set-info';

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
    setInfo: function () {
        return createAction(SET_INFO);
    }
};

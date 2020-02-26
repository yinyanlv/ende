import {createAction} from '@/common/utils';

export const DO_QUERY = 'orders:do-query';
export const IS_LOADING = 'orders:is-loading';
export const SET_ORDERS = 'orders:set-orders';
export const SET_SELECTED_RECORDS = 'orders:set-selected-records';
export const DELETE_ORDER = 'orders:delete-order';

export const ordersCreator = {
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    setSelectedRecords: (params) => {
        return createAction(SET_SELECTED_RECORDS, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setOrders: (params) => {
        return createAction(SET_ORDERS, params);
    },
    deleteOrder: (params) => {
        return createAction(DELETE_ORDER, params);
    }
};

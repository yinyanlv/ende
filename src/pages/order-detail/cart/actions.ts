import {createAction} from '@/common/utils';

export const DO_QUERY = 'order-detail:cart:do-query';
export const IS_LOADING = 'order-detail:cart:is-loading';
export const SET_CART = 'order-detail:cart:set-cart';
export const SET_SELECTED_RECORDS = 'orders:set-selected-records';
export const DELETE_PART = 'orders:delete-part';

export const cartCreator = {
    setIsLoading: (params) => {
        return createAction(IS_LOADING, params);
    },
    setSelectedRecords: (params) => {
        return createAction(SET_SELECTED_RECORDS, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setCart: (params) => {
        return createAction(SET_CART, params);
    },
    deletePart: (params) => {
        return createAction(DELETE_PART, params);
    }
};

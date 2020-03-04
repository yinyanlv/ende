import {createAction} from '@/common/utils';

export const DO_QUERY = 'order-detail:cart:do-query';
export const IS_LOADING = 'order-detail:cart:is-loading';
export const SET_CART = 'order-detail:cart:set-cart';
export const SET_SELECTED_RECORDS = 'order-detail:cart:set-selected-records';
export const DELETE_PART = 'order-detail:cart:delete-part';
export const ADD_PART = 'order-detail:cart:add-part';

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
    },
    addPart: (params) => {
        return createAction(ADD_PART, params);
    }
};

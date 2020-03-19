import {createAction} from '@/common/utils';

export const DO_QUERY = 'order-detail:cart:do-query';
export const IS_LOADING = 'order-detail:cart:is-loading';
export const SET_CART = 'order-detail:cart:set-cart';
export const SET_SELECTED_RECORDS = 'order-detail:cart:set-selected-records';
export const DELETE_PARTS = 'order-detail:cart:delete-parts';
export const ADD_PART = 'order-detail:cart:add-part';
export const EDIT_QTY = 'order-detail:cart:edit-qty';
export const UPDATE_RECORD = 'order-detail:cart:update-record';
export const SET_QUERY_PARAMS = 'order-detail:cart:set-query-params';

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
    deleteParts: (params) => {
        return createAction(DELETE_PARTS, params);
    },
    addPart: (params) => {
        return createAction(ADD_PART, params);
    },
    editQty: (params) => {
        return createAction(EDIT_QTY, params);
    },
    updateRecord: (params) => {
        return createAction(UPDATE_RECORD, params);
    },
    setQueryParams: (params) => {
        return createAction(SET_QUERY_PARAMS, params);
    }
};

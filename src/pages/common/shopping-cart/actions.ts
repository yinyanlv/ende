import {createAction} from '@/common/utils';

export const DO_QUERY = 'shopping-cart:do-query';
export const IS_SHOW_SHOPPING_CART = 'shopping-cart:is-show-shopping-cart';
export const SET_SHOPPING_CART = 'shopping-cart:set-shopping-cart';
export const ADD_TO_CART = 'shopping-cart:add-to-cart';
export const DELETE_FROM_CART = 'shopping-cart:delete-from-cart';
export const EDIT_PART_CART_COUNT = 'shopping-cart:change-part-cart-count';
export const ADD_AND_SHOW_SHOPPING_CART = 'shopping-cart:add-and-show-shopping-cart';

export const shoppingCartCreator = {
    setIsShowShoppingCart: (params) => {
        return createAction(IS_SHOW_SHOPPING_CART, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setShoppingCart: (params) => {
        return createAction(SET_SHOPPING_CART, params);
    },
    addAndShowShoppingCart: (params) => {
        return createAction(ADD_AND_SHOW_SHOPPING_CART, params);
    },
    addToCart: (params) => {
        return createAction(ADD_TO_CART, params);
    },
    deleteFromCart: (params) => {
        return createAction(DELETE_FROM_CART, params);
    },
    editPartCartCount: (params) => {
        return createAction(EDIT_PART_CART_COUNT, params);
    }
};

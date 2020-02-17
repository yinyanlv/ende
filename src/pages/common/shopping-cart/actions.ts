import {createAction} from '@/common/utils';

export const DO_QUERY = 'shopping-cart:do-query';
export const IS_SHOW_SHOPPING_CART = 'shopping-cart:is-show-shopping-cart';
export const SET_SHOPPING_CART = 'shopping-cart:set-shopping-cart';

export const shoppingCartCreator = {
    setIsShowShoppingCart: (params) => {
        return createAction(IS_SHOW_SHOPPING_CART, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    },
    setShoppingCart: (params) => {
        return createAction(SET_SHOPPING_CART, params);
    }
};

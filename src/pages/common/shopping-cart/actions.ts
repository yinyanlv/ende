import {createAction} from '@/common/utils';

export const DO_QUERY = 'shopping-cart:do-query';
export const IS_SHOW_SHOPPING_CART = 'shopping-cart:is-show-shopping-cart';

export const shoppingCartCreator = {
    setIsShowShoppingCart: (params) => {
        return createAction(IS_SHOW_SHOPPING_CART, params);
    },
    doQuery: (params) => {
        return createAction(DO_QUERY, params);
    }
};

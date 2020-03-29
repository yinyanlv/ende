import {createAction} from '@/common/utils';

export const LOAD_CART_COUNT = 'header:nav:load-cart-count';
export const SET_CART_COUNT = 'header:nav:set-cart-count';
export const LOGOUT = 'header:nav:logout';

export const navCreator = {
    loadCartCount: () => {
        return createAction(LOAD_CART_COUNT);
    },
    setCartCount: (params) => {
        return createAction(SET_CART_COUNT, params);
    },
    logout: () => {
        return createAction(LOGOUT);
    }
};

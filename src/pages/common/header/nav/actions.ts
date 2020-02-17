import {createAction} from '@/common/utils';

export const LOAD_CART_COUNT = 'header:nav:load-cart-count';
export const SET_CART_COUNT = 'header:nav:set-cart-count';

export const navCreator = {
    loadCartCount: (params) => {
        return createAction(LOAD_CART_COUNT, params);
    },
    setCartCount: (params) => {
        return createAction(SET_CART_COUNT, params);
    }
};
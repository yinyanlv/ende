import * as actions from './actions';

const initialState = {
    cartCount: 0
};

export function navReducer(state = initialState, action) {

    switch(action.type) {
        case actions.SET_CART_COUNT:
            return {
                cartCount: action.payload.cartCount
            };
        default:
            return state;
    }
}
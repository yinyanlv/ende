import * as actions from './actions';

const initialState = {
    isShow: false
};

export function shoppingCartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_SHOPPING_CART:
            return {
                isShow: action.payload.isShow
            };
        default:
            return state;
    }
}

import {combineReducers} from 'redux';
import * as actions from './actions';
import {infoReducer} from './info/reducer';
import {cartReducers} from './cart/reducers';
import {purchaserReducers} from './purchaser/reducers';

const initialState = {
    orderCode: null,
    info: {}
};

function orderDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_ORDER_CODE:
            return {
                ...state,
                orderCode: action.payload.orderCode
            };
        case actions.SET_INFO:
            return {
                ...state,
                info: action.payload
            };
        default:
            return state;
    }
}

export const orderDetailReducers = combineReducers({
    self: orderDetailReducer,
    info: infoReducer,
    cart: cartReducers,
    purchaser: purchaserReducers
});


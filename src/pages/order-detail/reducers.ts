import {combineReducers} from 'redux';
import * as actions from './actions';
import {infoReducer} from './info/reducer';
import {cartReducers} from './cart/reducers';
import {purchaserReducer} from './purchaser/reducer';
import {receiverReducer} from './receiver/reducer';
import {listReducer} from './list/reducer';
import {editReducer} from './edit/reducer';
import {importFileReducer} from './import-file/reducer';

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
    purchaser: purchaserReducer,
    receiver: receiverReducer,
    list: listReducer,
    edit: editReducer,
    importFile: importFileReducer
});


import {combineReducers} from 'redux';
import * as actions from './actions';
import {infoReducer} from './info/reducer';

const initialState = {
    orderCode: null,
};

function ordersReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export const orderDetailReducers = combineReducers({
    self: ordersReducer,
    info: infoReducer
});


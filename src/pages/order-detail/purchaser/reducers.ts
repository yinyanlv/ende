import * as actions from './actions';
import {combineReducers} from 'redux';
import {listReducer} from './list/reducer';

const initialState = {
    info: {}
};

export function purchaserReducer(state = initialState, action) {

    switch (action.type) {
        case actions.SET_INFO:
            return {
                ...state,
                info: action.payload || {}
            };
        default:
            return state;
    }
}

export const purchaserReducers = combineReducers({
    self: purchaserReducer,
    list: listReducer
});


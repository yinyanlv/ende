import * as actions from './actions';
import {combineReducers} from 'redux';
import {listReducer} from './list/reducer';
import {editReducer} from './edit/reducer';

const initialState = {
    info: {}
};

export function receiverReducer(state = initialState, action) {

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

export const receiverReducers = combineReducers({
    self: receiverReducer,
    list: listReducer,
    edit: editReducer
});


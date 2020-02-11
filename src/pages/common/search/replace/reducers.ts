import {combineReducers} from 'redux';
import * as actions from './actions';

const initialState = {};

function replaceReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_REPLACE_LIST:
            return action.payload;
        default:
            return state;
    }
}

export const replaceReducers = combineReducers({
    self: replaceReducer
});

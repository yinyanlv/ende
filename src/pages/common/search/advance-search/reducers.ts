import {combineReducers} from 'redux';
import * as actions from './actions';

const initialState = {};

function advanceSearchReducer(state = initialState, action) {
    switch(action.type) {
        case actions.LOAD_APPLICABILITY:
            return {};
        default:
            return {};
    }
}

export const advanceSearchReducers = combineReducers({
    self: advanceSearchReducer
});


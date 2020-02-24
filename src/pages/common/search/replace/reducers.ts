import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    queryParams: {},
    list: []
};

function replaceReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_REPLACE:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}

export const replaceReducers = combineReducers({
    self: replaceReducer,
    query: queryReducer
});

import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    queryParams: {
    },
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10
};

function replaceReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_REPLACE:
            return action.payload;
        default:
            return state;
    }
}

export const replaceReducers = combineReducers({
    self: replaceReducer,
    query: queryReducer
});

import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    queryParams: {},
    count: {
        applyCount: 0,
        partCount: 0,
        legendCount: 0
    }
};

function advanceSearchReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_QUERY_PARAMS:
            return {
                ...state,
                queryParams: action.payload
            };
        case actions.SET_COUNT:
            return {
                ...state,
                count: action.payload
            };
        default:
            return state;
    }
}

export const advanceSearchReducers = combineReducers({
    self: advanceSearchReducer,
    query: queryReducer
});


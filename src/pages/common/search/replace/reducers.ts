import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    partCode: null,
    isLoading: false,
    list: []
};

function replaceReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_PART_CODE:
            return {
                ...state,
                partCode: action.payload.partCode
            };
        case actions.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
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

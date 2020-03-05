import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    queryParams: {},
    isLoading: false,
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    selectedRecords: []
};

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_SELECTED_RECORDS:
            return {
                ...state,
                selectedRecords: action.payload
            };
        case actions.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case actions.SET_CART:
            const payload = action.payload;
            return {
                ...state,
                list: payload.list,
                pageNo: payload.pageNo,
                pageSize: payload.pageSize,
                total: payload.total
            };
        default:
            return state;
    }
}

export const cartReducers = combineReducers({
    self: cartReducer,
    query: queryReducer
});


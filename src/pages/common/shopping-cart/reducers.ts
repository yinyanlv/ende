import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    isShow: false,
    queryParams: {},
    isLoading: false,
    zIndex: 1000,
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    selectedRecords: []
};

function shoppingCartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_SHOPPING_CART:
            return {
                ...state,
                isShow: action.payload.isShow,
                zIndex: action.payload.zIndex || initialState.zIndex
            };
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
        case actions.UPDATE_RECORD:
            return {
                ...state,
                list: action.payload
            };
        case actions.SET_SHOPPING_CART:
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

export const shoppingCartReducers = combineReducers({
    self: shoppingCartReducer,
    query: queryReducer
});


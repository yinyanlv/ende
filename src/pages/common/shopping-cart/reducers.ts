import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    isShow: false,
    queryParams: {},
    isLoading: false,
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10
};

function shoppingCartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_SHOPPING_CART:
            return {
                ...state,
                isShow: action.payload.isShow
            };
        case actions.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
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


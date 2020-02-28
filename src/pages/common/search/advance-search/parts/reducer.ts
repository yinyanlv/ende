import * as actions from './actions';

const initialState = {
    isLoading: false,
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10
};

export function partsReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_PARTS:
            const payload = action.payload;
            return {
                ...state,
                list: payload.list,
                pageNo: payload.pageNo,
                pageSize: payload.pageSize,
                total: payload.total
            };
        case actions.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
}

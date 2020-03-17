import * as actions from './actions';

const initialState = {
    isLoading: false,
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
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
        case actions.RESET_STATE:
            return {
              ...initialState
            };
        default:
            return state;
    }
}

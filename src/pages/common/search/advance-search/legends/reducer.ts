import * as actions from './actions';

const initialState = {
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10
};

export function legendsReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_LEGENDS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

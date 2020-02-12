import * as actions from './actions';

const initialState = {
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

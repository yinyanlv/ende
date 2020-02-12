import * as actions from './actions';

const initialState = {
    list: [],
    total: 0,
    current: 1
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            return state;
        default:
            return state;
    }
}

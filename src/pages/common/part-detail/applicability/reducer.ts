import * as actions from './actions';

const initialState = {
    list: []
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

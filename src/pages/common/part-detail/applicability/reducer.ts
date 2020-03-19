import * as actions from './actions';

const initialState = {
    list: [],
    selectedKeys: []
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            return {
                ...state,
                list: action.payload
            };
        case actions.SET_SELECTED_KEYS:
            return {
                ...state,
                selectedKeys: action.payload
            };
        default:
            return state;
    }
}

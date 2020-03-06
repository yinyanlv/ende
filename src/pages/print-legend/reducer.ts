import * as actions from './actions';

const initialState = {
    isLoading: false,
    list: []
};

export function printLegendReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_PARTS:
            return {
                ...state,
                list: action.payload
            };
        case actions.SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
}

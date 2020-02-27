import * as actions from './actions';

const initialState = {
    isLoading: true,
    list: []
};

export function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case actions.SET_APPLICATION:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}

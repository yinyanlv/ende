import * as actions from './actions';

const initialState = {
    isGroupLoading: false,
    group: []
};

export function usageReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.LOAD_GROUP:
            return {
                ...state,
                isGroupLoading: true
            };
        case actions.LOAD_GROUP_SUCCESS:
            return {
                ...state,
                isGroupLoading: false,
                group: action.payload
            };
        case actions.LOAD_GROUP_FAILED:
            return {
                ...state,
                isGroupLoading: false
            };
        case actions.SET_ACTIVE_CODES:
            return {
                ...state,
                ...action.payload
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}


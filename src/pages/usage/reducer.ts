import * as actions from './actions';

const initialState = {
    activeCallout: '',
    isShowParts: false
};

export function usageReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.CONTROL_PARTS_SHOW:
            return {
                ...state,
                isShowParts: action.payload
            };
        case actions.SET_ACTIVE_CALLOUT:
            return {
                ...state,
                activeCallout: action.payload
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}


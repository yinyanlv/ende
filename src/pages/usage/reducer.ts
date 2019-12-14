import * as actions from './actions';

const initialState = {
    activeCallout: '',
    isShowParts: false,
    isLegendsLoading: false,
    legends: [],
    isPartsLoading: false,
    parts: {
        usages: []
    }
};

export function usageReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.LOAD_LEGENDS:
            return {
                ...state,
                isLegendsLoading: true
            };
        case actions.LOAD_LEGENDS_SUCCESS:
            return {
                ...state,
                isLegendsLoading: false,
                legends: action.payload,
            };
        case actions.LOAD_LEGENDS_FAILED:
            return {
                ...state,
                isLegendsLoading: false
            };
        case actions.LOAD_PARTS:
            return {
                ...state,
                isPartsLoading: true
            };
        case actions.LOAD_PARTS_SUCCESS:
            return {
                ...state,
                isPartsLoading: false,
                parts: action.payload
            };
        case actions.LOAD_PARTS_FAILED:
            return {
                ...state,
                isPartsLoading: false
            };
        case actions.CONTROL_LEGEND_SHOW:
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


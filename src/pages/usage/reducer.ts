import * as actions from './actions';

const initialState = {
    isFirstLoad: true,
    activeCallout: '',
    isShowGroups: true,
    isShowLegendParts: false,
    isShowParts: true
};

export function usageReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.SET_IS_SHOW_GROUPS:
            return {
                ...state,
                isShowGroups: action.payload
            };
        case actions.SET_IS_LEGEND_PARTS_SHOW:
            return {
                ...state,
                isShowLegendParts: action.payload
            };
        case actions.SET_IS_SHOW_PARTS:
            return {
                ...state,
                isShowParts: action.payload
            };
        case actions.SET_ACTIVE_CALLOUT:
            return {
                ...state,
                activeCallout: action.payload
            };
        case actions.SET_IS_FIRST_LOAD:
            return {
                ...state,
                isFirstLoad: action.payload
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}


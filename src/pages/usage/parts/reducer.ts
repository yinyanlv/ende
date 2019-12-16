import * as actions from './actions';

const initialState = {
    isPartsLoading: false,
    parts: {
        usages: []
    }
};

export function partsReducer(state = initialState, action: any) {
    switch (action.type) {
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
        default:
            return state;
    }
}


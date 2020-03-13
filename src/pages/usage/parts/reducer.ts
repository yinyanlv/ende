import * as actions from './actions';

const initialState = {
    isPartsLoading: false,
    selectedKeys: [],
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
                parts: action.payload,
                selectedKeys: initialState.selectedKeys
            };
        case actions.LOAD_PARTS_FAILED:
            return {
                ...state,
                isPartsLoading: false
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


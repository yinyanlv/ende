import * as actions from './actions';

const initialState = {
    isLegendsLoading: false,
    legends: []
};

export function legendsReducer(state = initialState, action: any) {
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
        default:
            return state;
    }
}


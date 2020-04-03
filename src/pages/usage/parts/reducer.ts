import * as actions from './actions';
import {updateRecords} from '@/common/utils';

const initialState = {
    isPartsLoading: false,
    width: 720,
    isScrollIntoView: true,
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
        case actions.SET_WIDTH:
            return {
                ...state,
                width: action.payload.width
            };
        case actions.UPDATE_RECORDS:
            return {
                ...state,
                parts: {
                    usages: updateRecords(action.payload.partCodes, state.parts.usages, action.payload.value)
                }
            };
        case actions.SET_IS_SCROLL_INTO_VIEW:
            return {
                ...state,
                isScrollIntoView: action.payload.isScrollIntoView
            };
        default:
            return state;
    }
}


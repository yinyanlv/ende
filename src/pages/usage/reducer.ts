import * as actions from './actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';


const initialState = {
    isGroupsLoading: false,
    groups: [],
    activeTreeNodeCode: defaultCode,
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
        case actions.LOAD_GROUPS:
            return {
                ...state,
                isGroupsLoading: true
            };
        case actions.LOAD_GROUPS_SUCCESS:
            return {
                ...state,
                isGroupsLoading: false,
                groups: action.payload
            };
        case actions.LOAD_GROUPS_FAILED:
            return {
                ...state,
                isGroupsLoading: false
            };
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
        case actions.SET_ACTIVE_CODES:
            return {
                ...state,
                activeTreeNodeCode: defaultCode,
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


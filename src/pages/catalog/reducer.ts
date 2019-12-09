import * as actions from './actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';

const initialState = {
    isBrandsLoading: false,
    brands: [],
    isConditionsLoading: false,
    conditions: [],
    activeM1Code: defaultCode,
    activeM2Code: defaultCode,
    activeM3Code: defaultCode,
    activeM4Code: defaultCode
};

export function catalogReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.LOAD_BRANDS:
            return {
                ...state,
                isBrandsLoading: true
            };
        case actions.LOAD_BRANDS_SUCCESS:
            return {
                ...state,
                isBrandsLoading: false,
                brands: action.payload
            };
        case actions.LOAD_BRANDS_FAILED:
            return {
                ...state,
                isBrandsLoading: false
            };
        case actions.LOAD_CONDITIONS_BEFORE:
            return {
                ...state,
                isConditionsLoading: true
            };
        case actions.LOAD_CONDITIONS:
            return {
                ...state,
                isConditionsLoading: true
            };
        case actions.LOAD_CONDITIONS_SUCCESS:
            return {
                ...state,
                isConditionsLoading: false,
                conditions: action.payload
            };
        case actions.LOAD_CONDITIONS_FAILED:
            return {
                ...state,
                isConditionsLoading: false
            };
        case actions.SET_ACTIVE_CODES:
            return {
                ...state,
                activeM1Code: defaultCode,
                activeM2Code: defaultCode,
                activeM3Code: defaultCode,
                activeM4Code: defaultCode,
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


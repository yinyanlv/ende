import * as actions from './actions';
import {LOAD_BRANDS_SET_ACTIVE_M2} from "./actions";

const initialState = {
    isBrandsLoading: false,
    brands: [],
    isConditionsLoading: false,
    conditions: [],
    activeM1Code: '-1',
    activeM2Code: '-1',
    activeM3Code: '-1',
    activeM4Code: '-1'
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
            const params = action.payload;
            return {
                ...state,
                activeM1Code: params.m_1,
                activeM2Code: params.m_2,
                activeM3Code: params.m_3,
                activeM4Code: params.m_4
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}


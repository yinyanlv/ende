import * as actions from './actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';

const initialState = {
    isConditionsLoading: false,
    conditions: [],
    activeM3Code: defaultCode,
    activeM4Code: defaultCode
};

export function conditionsReducer(state = initialState, action: any) {

    switch (action.type) {
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
        case actions.SET_ACTIVE_CONDITIONS_CODES:
            return Object.assign({}, state, action.paylaod);
        default:
            return state;
    }
}


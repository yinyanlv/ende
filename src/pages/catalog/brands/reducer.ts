import * as actions from './actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';

const initialState = {
    isBrandsLoading: false,
    brands: [],
    activeM1Code: defaultCode,
    activeM2Code: defaultCode
};

export function brandsReducer(state = initialState, action: any) {

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
        case actions.SET_ACTIVE_BRANDS_CODE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}


import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';
import {applicabilityReducer} from './applicability/reducer';
import {partsReducer} from './parts/reducer';
import {legendsReducer} from './legends/reducer';

const initialState = {
    fieldsValue: {},
    queryParams: {},
    activeTab: 'applicability',
    count: {
        applyCount: 0,
        partCount: 0,
        legendCount: 0
    }
};

function advanceSearchReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_QUERY_PARAMS:
            return {
                ...state,
                queryParams: action.payload
            };
        case actions.SET_COUNT:
            return {
                ...state,
                count: action.payload
            };
        case actions.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload.activeTab
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}

export const advanceSearchReducers = combineReducers({
    self: advanceSearchReducer,
    query: queryReducer,
    applicability: applicabilityReducer,
    parts: partsReducer,
    legends: legendsReducer,
});


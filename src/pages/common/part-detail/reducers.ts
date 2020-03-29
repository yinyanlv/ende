import {combineReducers} from 'redux';
import * as actions from './actions';
import {partInfoReducer} from './part-info/reducer';
import {applicabilityReducer} from './applicability/reducer';
import {replaceReducer} from './replace/reducer';
import {bulletinReducer} from './bulletin/reducer';

const initialState = {
    isShow: false,
    activeTab: 'applicability',
    zIndex: 1000,
    bulletinCount: 0,
    partCode: null
};

function partDetailReducer(state = initialState, action) {
    switch(action.type) {
        case actions.IS_SHOW_PART_DETAIL:
            const payload = action.payload;
            return {
                ...state,
                isShow: payload.isShow,
                zIndex: payload.zIndex || initialState.zIndex,
                activeTab: payload.activeTab || initialState.activeTab,
                partCode: payload.partCode
            };
        case actions.SET_COUNT:
            return {
                ...state,
                bulletinCount: action.payload
            };
        case actions.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload.activeTab
            };
        default:
            return state;
    }
}

export const partDetailReducers = combineReducers({
    self: partDetailReducer,
    partInfo: partInfoReducer,
    applicability: applicabilityReducer,
    replace: replaceReducer,
    bulletin: bulletinReducer
});

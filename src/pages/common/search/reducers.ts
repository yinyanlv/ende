import {combineReducers} from 'redux';
import * as actions from './actions';
import {advanceSearchReducers} from './advance-search/reducers'
import {replaceReducers} from './replace/reducers';

const initialState = {
    isShow: false,
    zIndex: 1000,
    activeTab: 'advance-search',
};

function searchReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_SEARCH:
            return {
                ...state,
                isShow: action.payload.isShow,
                activeTab: action.payload.activeTab || state.activeTab || initialState.activeTab,
                zIndex: action.payload.zIndex || initialState.zIndex
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

export const searchReducers = combineReducers({
    self: searchReducer,
    advanceSearch: advanceSearchReducers,
    replace: replaceReducers
});

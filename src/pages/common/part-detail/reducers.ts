import {combineReducers} from 'redux';
import * as actions from './actions';
import {partInfoReducer} from './part-info/reducer';
import {applicabilityReducer} from './applicability/reducer';
import {replaceReducer} from './replace/reducer';
import {bulletinReducer} from './bulletin/reducer';

const initialState = {
    isShow: false,
    bulletinCount: 0
};

function partDetailReducer(state = initialState, action) {
    switch(action.type) {
        case actions.IS_SHOW_PART_DETAIL:
            return {
                ...state,
                isShow: action.payload.isShow
            };
        case actions.SET_COUNT:
            return {
                ...state,
                bulletinCount: action.payload
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
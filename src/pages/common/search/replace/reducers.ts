import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    queryParams: {},
    list: [{
        "oldPartCode": "23955244",
        "oldApplyCode": null,
        "newPartCode": "23520614",
        "newApplyCode": "CN180S",
        "typeName": "test",
        "dateTime": 1479398400000,
        "note": " 2016-11-18 前用:23955244",
        "formattedDateTime": "2016-11-18"
    }]
};

function replaceReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_REPLACE:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}

export const replaceReducers = combineReducers({
    self: replaceReducer,
    query: queryReducer
});

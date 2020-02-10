import * as actions from './actions';

const initialState = {};

export function replaceReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_REPLACE_LIST:
            return action.payload;
        default:
            return state;
    }
}

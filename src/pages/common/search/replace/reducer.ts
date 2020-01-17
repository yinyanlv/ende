import * as actions from './actions';

const initialState = {};

export function replaceReducer(state = initialState, action) {
    switch(action.type) {
        case actions.REPLACE_SEARCH:
            return {};
        default:
            return state;
    }
}

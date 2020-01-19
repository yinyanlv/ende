import * as actions from './actions';

const initialState = {};

export function replaceReducer(state = initialState, action) {
    switch(action.type) {
        case actions.QUERY_REPLACE:
            return {};
        default:
            return state;
    }
}

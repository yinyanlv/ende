import * as actions from './actions';

export const initialState = {

};

export function advanceSearchQueryReducer(state = initialState, action) {
    switch(action.type) {
        case actions.ADVANCE_SEARCH_QUERY:
            return action.payload;
        default:
            return state;
    }
}

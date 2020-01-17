import * as actions from './actions';

const initialState = {};

export function vinSearchReducer(state = initialState, action) {
    switch(action.type) {
        case actions.VIN_SEARCH:
            return {};
        case actions.VSN_SEARCH:
            return {};
        case actions.PART_CODE_SEARCH:
            return {};
        case actions.PART_NAME_SEARCH:
            return {};
        default:
            return state;
    }
}

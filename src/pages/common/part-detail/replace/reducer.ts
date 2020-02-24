import * as actions from './actions';

const initialState = {
    list: []
};

export function replaceReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_REPLACE:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

import * as actions from './actions';

const initialState = {
    list: []
};

export function bulletinReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_BULLETIN:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

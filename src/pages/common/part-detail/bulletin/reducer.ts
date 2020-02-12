import * as actions from './actions';

const initialState = {
};

export function bulletinReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_BULLETIN:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

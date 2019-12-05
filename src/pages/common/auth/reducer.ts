import * as actions from './actions';

const initialState = {};

export function authReducer(state = initialState, action) {

    switch (action.type) {
        case actions.SET_USER_DATA:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}
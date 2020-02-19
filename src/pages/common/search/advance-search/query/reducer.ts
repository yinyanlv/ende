import * as actions from './actions';

export const initialState = {
    groupList: [],
    fieldValues: {}
};

export function queryReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_GROUP:
            return {
                ...state,
                groupList: action.payload
            };
        default:
            return state;
    }
}

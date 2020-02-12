import * as actions from './actions';

export const initialState = {
    groupList: []
};

export function queryReducer(state = initialState, action) {
    switch(action.type) {

        case actions.DO_QUERY:
            return action.payload;
        case actions.SET_GROUP:
            return {
                ...state,
                groupList: action.payload
            };
        default:
            return state;
    }
}

import * as actions from './actions';

const initialState = {
};

export function partInfoReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_PART_INFO:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

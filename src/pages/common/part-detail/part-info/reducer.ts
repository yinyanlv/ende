import * as actions from './actions';

const initialState = {
     info: {}
};

export function partInfoReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_PART_INFO:
            return {
                info: action.payload
            };
        default:
            return state;
    }
}

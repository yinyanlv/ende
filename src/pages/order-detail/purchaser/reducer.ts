import * as actions from './actions';

const initialState = {
    info: {}
};

export function purchaserReducer(state = initialState, action) {

    switch (action.type) {
        case actions.SET_INFO:
            return {
                ...state,
                info: action.payload
            };
        default:
            return state;
    }
}

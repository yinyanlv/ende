import * as actions from './actions';

const initialState = {
    isShow: false
};

export function searchReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_SEARCH:
            return {
                ...state,
                isShow: action.payload.isShow
            };
        default:
            return state;
    }

}

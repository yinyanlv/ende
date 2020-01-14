import * as actions from './actions';

const initialState = {
    isShow: false
};

export function partDetailReducer(state = initialState, action) {
    switch(action.type) {
        case actions.IS_SHOW_PART_DETAIL:
            return {
                isShow: action.payload.isShow
            };
        default:
            return state;
    }
}

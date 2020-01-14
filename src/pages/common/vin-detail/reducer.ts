import * as actions from './actions';

const initialState = {
    isShow: false
};

export function vinDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_VIN_DETAIL:
            return {
                isShow: action.payload.isShow
            };
        default:
            return state;
    }
}

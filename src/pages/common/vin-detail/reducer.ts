import * as actions from './actions';

const initialState = {
    isShow: false,
    zIndex: 1000,
    type: 'vin',
    data: {}
};

export function vinDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_VIN_DETAIL:
            return {
                isShow: action.payload.isShow,
                zIndex: action.payload.zIndex || initialState.zIndex,
                type: action.payload.type || 'vin',
                data: action.payload.data || {}
            };
        default:
            return state;
    }
}

import * as actions from './actions';

const initialState = {
    isShow: false,
    fieldsValue: {}
};

export function editReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_IS_SHOW_EDIT:
            return {
                ...state,
                isShow: action.payload.isShow
            };
        case actions.SET_FIELDS_VALUE:
            return {
              ...state,
              fieldsValue: action.payload.isLoading
            };
        default:
            return state;
    }
}

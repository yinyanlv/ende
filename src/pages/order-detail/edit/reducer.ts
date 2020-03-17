import * as actions from './actions';

const initialState = {
    isShow: false,
    type: 'purchaser',
    fieldsValue: {},
    mode: 'create',
    selectedKey: null
};

export function editReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_IS_SHOW_EDIT:
            return {
                ...state,
                isShow: action.payload.isShow,
                type: action.payload.type || initialState.type,
                mode: action.payload.mode || initialState.mode,
                fieldsValue: action.payload.fieldsValue || {}
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

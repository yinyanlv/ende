import * as actions from './actions';

const initialState = {
    isShow: false,
    isLoading: false,
    type: 'purchaser',
    list: [],
    selectedKeys: []
};

export function listReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_IS_SHOW_LIST:
            return {
                ...state,
                isShow: action.payload.isShow,
                type: action.payload.type
            };
        case actions.SET_IS_LOADING:
            return {
              ...state,
              isLoading: action.payload.isLoading
            };
        case actions.SET_SELECTED_KEYS:
            return {
                ...state,
                selectedKeys: action.payload
            };
        case actions.SET_LIST:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}

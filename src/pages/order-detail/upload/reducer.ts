import * as actions from './actions';

const initialState = {
    isShow: false,
    isUploading: false
};

export function uploadReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_IS_SHOW_UPLOAD:
            return {
                ...state,
                isShow: action.payload.isShow
            };
        case actions.SET_IS_UPLOADING:
            return {
              ...state,
              isUploading: action.payload.isUploading
            };
        default:
            return state;
    }
}

import * as actions from './actions';

const initialState = {
    isShow: false,
    models: []
};

export function vsnSelectorReducer(state = initialState, action) {
    switch(action.type) {
        case actions.IS_SHOW_VSN_SELECTOR:
            return {
                isShow: action.payload.isShow,
                models: action.payload.models || []
            };
        default:
            return state;
    }
}

import * as actions from './actions';

const initialState = {
    isShow: false,
    vsnCode: '',
    doNotRedirect: false,
    list: [],
    advanceSearchParams: null,
    zIndex: 1000
};

export function vsnSelectorReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_VSN_SELECTOR:
            return {
                isShow: action.payload.isShow,
                vsnCode: action.payload.vsnCode || initialState.vsnCode,
                doNotRedirect: action.payload.doNotRedirect || initialState.doNotRedirect,
                list: action.payload.list || initialState.list,
                advanceSearchParams: action.payload.advanceSearchParams || initialState.advanceSearchParams,
                zIndex: action.payload.zIndex || initialState.zIndex
            };
        default:
            return state;
    }
}

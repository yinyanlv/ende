import * as actions from './actions';

const initialState = {
    lang: 'zh',
    productCatalogUrl: '',
    logoutUrl: '',
    oemCode: '',
    resHost: '',
    user: null,
    maxZIndex: 1000
};

export function configReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_CONFIG:
            return {
                ...state,
                ...action.payload
            };
        case actions.SET_MAX_Z_INDEX:
            return {
                ...state,
                maxZIndex: action.payload.maxZIndex || initialState.maxZIndex
            };
        default:
            return state;
    }
}

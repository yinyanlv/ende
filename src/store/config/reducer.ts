import * as actions from './actions';

const initialState = {
    lang: 'zh',
    productCatalogUrl: '',
    logoutUrl: '',
    oemCode: '',
    resHost: ''
};

export function configReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_CONFIG:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

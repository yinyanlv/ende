import * as actions from './actions';

const initialState = {
    lang: 'zh-CN'
};

export function configReducer(state = initialState, action: any) {
    switch (action.type) {
        case actions.SET_CONFIG:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}

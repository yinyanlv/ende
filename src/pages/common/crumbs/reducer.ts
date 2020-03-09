import * as actions from './actions';

export const defaultCode = '-1';

const initialState = {
    list: [],
    isShowCollect: false
};

export function crumbsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_CRUMBS:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

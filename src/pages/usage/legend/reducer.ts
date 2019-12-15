import * as actions from './actions';

const initialState = {
    svgUri: false
};

export function legendReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.SET_SVG_URI:
            return {
                ...state,
                svgUri: action.payload
            };
        default:
            return state;
    }
}


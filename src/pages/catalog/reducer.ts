import * as Actions from './actions';

const initialState = {
    brands: [],
    years: [{
        code: '',
        name: ''
    }],
    models: []
};

export function catalogReducer(state = initialState, action) {

    switch (action.type) {
        case Actions.LOAD_BRANDS_SUCCESS:
            return {
                ...state,
                brands: action.payload
            };
        default:
            return state;
    }
}

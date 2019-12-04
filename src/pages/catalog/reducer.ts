import * as actions from './actions';

const initialState = {
    isBrandsLoading: false,
    isYearsLoading: false,
    isModelsLoading: false,
    brands: [],
    years: [{
        code: '',
        name: ''
    }],
    models: []
};

export function catalogReducer(state = initialState, action) {

    switch (action.type) {
        case actions.LOAD_BRANDS:
            return {
                ...state,
                isBrandsLoading: true
            };
        case actions.LOAD_BRANDS_SUCCESS:
            return {
                ...state,
                isBrandsLoading: false,
                brands: action.payload
            };
        case actions.LOAD_BRANDS_FAILED:
            return {
                ...state,
                isBrandsLoading: false
            };
        default:
            return state;
    }
}

import * as actions from './actions';

const initialState = {
    isBrandsLoading: false,
    brands: [],
    isConditionsLoading: false,
    conditions: []
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
        case actions.LOAD_BRANDS_SET_ACTIVE:
            return {
                ...state,
                brands: setActiveBrand(action.payload, state.brands)
            };
        case actions.LOAD_CONDITIONS_BEFORE:
            return {
                ...state,
                isConditionsLoading: true
            };
        case actions.LOAD_CONDITIONS:
            return {
                ...state,
                isConditionsLoading: true
            };
        case actions.LOAD_CONDITIONS_SUCCESS:
            return {
                ...state,
                isConditionsLoading: false,
                conditions: action.payload
            };
        case actions.LOAD_CONDITIONS_FAILED:
            return {
                ...state,
                isConditionsLoading: false
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}

function setActiveBrand(activeCode, brands) {
    let hasMatched = false;

    if (!brands) {
        return [];
    }

    brands.forEach((item) => {

        item.list && item.list.forEach((subItem) => {

            if (activeCode === subItem.code) {
                hasMatched = true;
                subItem.active = true;
            } else {
                subItem.active = false;
            }
        });
    });

    if (!hasMatched && brands.length > 0 && brands[0].list && brands[0].list.length > 0) {
        brands[0].list[0].active = true;
    }

    return [...brands];
}

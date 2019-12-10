import * as actions from './actions';

const initialState = {
    isGroupsLoading: false,
    groups: [],
    activeTreeNodeCode: '00',
    legends: []
};

export function usageReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.LOAD_GROUPS:
            return {
                ...state,
                isGroupsLoading: true
            };
        case actions.LOAD_GROUPS_SUCCESS:
            return {
                ...state,
                isGroupsLoading: false,
                groups: action.payload
            };
        case actions.LOAD_GROUPS_FAILED:
            return {
                ...state,
                isGroupsLoading: false
            };
        case actions.LOAD_LEGENDS_SUCCESS:
            return {
                ...state,
                legends: action.payload
            };
        case actions.SET_ACTIVE_CODES:
            return {
                ...state,
                ...action.payload
            };
        case actions.RESET_STATE:
            return {
                ...initialState
            };
        default:
            return state;
    }
}


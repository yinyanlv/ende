import * as actions from './actions';
import {updateRecords} from '@/common/utils';

const initialState = {
    isLoading: false,
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    selectedKeys: []
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            const payload = action.payload;
            return {
                ...state,
                list: payload.list,
                pageNo: payload.pageNo,
                pageSize: payload.pageSize,
                total: payload.total
            };
        case actions.UPDATE_RECORDS:
            return {
                ...state,
                list: updateRecords(action.payload.partCodes, state.list, action.payload.value)
            };
        case actions.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        case actions.SET_SELECTED_KEYS:
            return {
                ...state,
                selectedKeys: action.payload
            };
        case actions.RESET_STATE:
            return {
              ...initialState
            };
        default:
            return state;
    }
}


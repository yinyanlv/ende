import * as actions from './actions';

const initialState = {
    info: {}
};

export function partInfoReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_PART_INFO:
            return {
                info: action.payload || initialState.info
            };
        case actions.UPDATE_PART_INFO:
            const originalInfo = state && state.info as any;
            if (originalInfo.code && originalInfo.code === action.payload.code) {
                return {
                    info: {
                        ...state.info,
                        ...action.payload
                    }
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}

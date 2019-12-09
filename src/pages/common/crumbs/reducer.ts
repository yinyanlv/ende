import * as actions from './actions';

export const defaultCode = '-1';
export const crumbsText = {
    all: '全部',
    m_1: '品牌',
    m_2: '目录',
    m_3: '年份',
    m_4: '车型',
};

const initialState = {
    list: []
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

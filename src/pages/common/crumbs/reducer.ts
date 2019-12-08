import * as actions from './actions';

export const crumbsText = {
    all: '全部',
    m_1: '品牌',
    m_2: '目录',
    m_3: '年份',
    m_4: '车型',
};

const initialState = {
    list: [{
        code: 'm_1',
        name: '五菱',
        label: crumbsText['m_1'],
        url: '',
    }, {
        code: 'm_2',
        name: crumbsText['all'],
        label: crumbsText['m_2'],
        url: '',
    }, {
        code: 'm_3',
        name: crumbsText['all'],
        label: crumbsText['m_3'],
        url: '',
    }]
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
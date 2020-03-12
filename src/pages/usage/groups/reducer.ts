import * as actions from './actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';

const initialState = {
    isGroupsLoading: false,
    groups: [],
    flatPathList: [],
    expandedTreeNodeCodes: [],
    activeTreeNodeCode: defaultCode
};

export function groupsReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.RESET_GROUPS:
            return {
                ...initialState
            };
        case actions.LOAD_GROUPS:
            return {
                ...state,
                isGroupsLoading: true
            };
        case actions.LOAD_GROUPS_SUCCESS:
            return {
                ...state,
                isGroupsLoading: false,
                groups: action.payload,
                flatPathList: getFlatPathList(action.payload)
            };
        case actions.LOAD_GROUPS_FAILED:
            return {
                ...state,
                isGroupsLoading: false
            };
        case actions.SET_ACTIVE_TREE_NODE_CODE:
            return {
                ...state,
                activeTreeNodeCode: action.payload
            };
        case actions.SET_EXPANDED_TREE_NODE_CODES:
            return {
                ...state,
                expandedTreeNodeCodes: action.payload
            };
        default:
            return state;
    }
}

function getFlatPathList(groups) {
    const list: string[] = [];
    for (let i = 0; i < groups.length; i++) {
        const code = groups[i].code;
        const children = groups[i].children;

        for (let j = 0; j < children.length; j++) {
            list.push(`${code}/${children[j].code}`);
        }
    }

    return list;
}

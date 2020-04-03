import * as actions from './actions';
import {defaultCode} from '@/pages/common/crumbs/reducer';

const initialState = {
    isGroupsLoading: false,
    groups: [],
    flatPathList: [],
    expandedTreeNodeCodes: [],
    width: 250,
    activeTreeNodeCode: defaultCode
};

export function groupsReducer(state = initialState, action: any) {

    switch (action.type) {
        case actions.RESET_GROUPS:
            return {
                ...initialState,
                width: state.width ? state.width : initialState.width
            };
        case actions.LOAD_GROUPS:
            return {
                ...state,
                isGroupsLoading: true
            };
        case actions.LOAD_GROUPS_SUCCESS:
            const result = rebuildGroups(action.payload);
            return {
                ...state,
                isGroupsLoading: false,
                groups: result.groups,
                flatPathList: result.flatPathList
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
        case actions.SET_WIDTH:
            return {
                ...state,
                width: action.payload.width
            };
        default:
            return state;
    }
}

function rebuildGroups(groups) {
    const list: string[] = [];

    for (let i = 0; i < groups.length; i++) {
        let temp = groups[i];
        const code = temp.code;
        const note = temp.note ? ` (${temp.note})` : '';
        temp.key = code;
        temp.codePathStr = code;
        temp.title = code + ' - ' + temp.text + note;
        const children = groups[i].children;

        for (let j = 0; j < children.length; j++) {
            let item = children[j];
            const note = item.note ? ` (${item.note})` : '';
            item.key = item.code;
            item.codePathStr = `${code}/${item.code}`;
            item.title = item.code + ' - ' + item.text + note;
            item.isLeaf = item.leaf;
            list.push(item.codePathStr);
        }
    }

    return {
        groups: groups,
        flatPathList: list
    };
}

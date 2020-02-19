import * as actions from './actions';

export const initialState = {
    groupList: [],
    fieldValues: {},
    modelOptions: []
};

export function queryReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_GROUP:
            return {
                ...state,
                groupList: action.payload
            };
        case actions.SET_M1:
            return {
                ...state,
                modelOptions: action.payload
            };
        case actions.SET_M2:
            return {
                ...state,
                modelOptions: insertModelOptions(state.modelOptions, 0, 0, null, action.payload.path, action.payload.list)
            };
        case actions.SET_M3:
            return {
                ...state,
                modelOptions: insertModelOptions(state.modelOptions, 1, 0, null, action.payload.path, action.payload.list)
            };
        case actions.SET_M4:
            return {
                ...state,
                modelOptions: insertModelOptions(state.modelOptions, 2, 0, null, action.payload.path, action.payload.list)
            };
        default:
            return state;
    }
}

function insertModelOptions(options, targetLevel, currentLevel, parentValue, path, list) {

    if (targetLevel === currentLevel) {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === path[currentLevel]) {
                options[i].children = list;
            }
        }
    } else {
        for (let i = 0; i < options.length; i++) {
            if (options[i].children) {
                options[i].children = insertModelOptions(options[i].children, targetLevel, currentLevel + 1, options[i].value, path, list);
            }
        }
    }

    return options;

}

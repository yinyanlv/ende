import * as actions from './actions';

export const initialState = {
    fieldsValue: {},
    groupList: [],
    modelOptions: []
};

export function queryReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_FIELDS_VALUE:
            return {
                ...state,
                fieldsValue: action.payload
            };
        case actions.SET_GROUP:
            return {
                ...state,
                groupList: action.payload
            };
        case actions.SET_MODEL_OPTIONS:
            return {
                ...state,
                modelOptions: action.payload
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

export function insertModelOptions(options, targetLevel, currentLevel, parentValue, path, list) {

    if (targetLevel === currentLevel) {
        for (let i = 0; i < options.length; i++) {
            if (targetLevel === 0) {
                if (options[i].value === path[currentLevel]) {
                    if (!options[i].children) {
                        options[i].children = list;
                    }
                }

            } else if (parentValue === path[currentLevel -1]) {
                if (options[i].value === path[currentLevel]) {
                    if (!options[i].children) {
                        options[i].children = list;
                    }
                }
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

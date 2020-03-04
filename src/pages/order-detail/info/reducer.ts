import * as actions from './actions';

export const initialState = {
    fieldsValue: {},
    transportList: [],
    typeList: [],
    organizationList: [],
    channelList: [],
    productGroupList: [],
    factoryList: [],
    planningList: []
};

export function infoReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_FIELDS_VALUE:
            return {
                ...state,
                fieldsValue: action.payload
            };
        case actions.SET_TRANSPORT:
            return {
                ...state,
                transportList: action.payload
            };
        case actions.SET_TYPE:
            return {
                ...state,
                typeList: action.payload
            };
        case actions.SET_ORGANIZATION:
            return {
                ...state,
                organizationList: action.payload
            };
        case actions.SET_CHANNEL:
            return {
                ...state,
                channelList: action.payload
            };
        case actions.SET_PRODUCT_GROUP:
            return {
                ...state,
                productGroupList: action.payload
            };
        case actions.SET_FACTORY:
            return {
                ...state,
                factoryList: action.payload
            };
        case actions.SET_PLANNING:
            return {
                ...state,
                planningList: action.payload
            };
        default:
            return state;
    }
}


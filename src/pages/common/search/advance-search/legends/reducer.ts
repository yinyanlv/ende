import * as actions from './actions';

const initialState = {
    list: [{
        "catalogueCode": "CN185M",
        "catalogueName": "宝骏360",
        "legendCode": "BC04-009",
        "legendGroupCode": "04",
        "legendGroupName": "变速器和控制-制动系统",
        "legendName": "制动管路总成",
        "legendNote": "",
        "legendSubGroupCode": null,
        "legendSubGroupName": null
    }],
    total: 50,
    pageNo: 1,
    pageSize: 10
};

export function legendsReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_LEGENDS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

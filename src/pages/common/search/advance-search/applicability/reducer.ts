import * as actions from './actions';

const initialState = {
    list: [{
        "id":"1223",  // 用法id
        "catalogueCode": "6370",     // 目录
        "hand": null,                          // 左右
        "handName": null,                // 左右名称
        "legendCode": "6370-P311",  // 图例编码
        "legendGroupCode": "00",	 //主组编码
        "legendGroupName": "发动机-发动机装配-离合器",    // 主组描述
        "legendName": "发动机总成",                                     // 图例名称
        "legendNote":null,							// 图例备注
        "legendSubGroupCode": null,
        "legendSubGroupName": null,
        "note": "96-04 (6370) 16",                                         // 用途
        "partCode": "111-8801015",                                     // 零件编码
        "partName": "进气箱",                                               // 零件名称
        "qty": "1"                                                                   // 用量
    }],
    total: 50,
    pageNo: 1,
    pageSize: 10
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

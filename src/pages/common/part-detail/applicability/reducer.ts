import * as actions from './actions';

const initialState = {
    list: [{
        "catalogueCode": "N1",	// 目录
        "hand": "",
        "handName": null,		//左右
        "id": "124872",
        "legendCode": null,
        "legendGroupCode": null,		//主组编码
        "legendGroupName": null,		//主组描述
        "legendName": null,				//图例描述
        "legendNote": null,
        "legendSubGroupCode": null,
        "legendSubGroupName": null,
        "note": "02-09 (6371)(6376C)(6386C)(6400C) 16",		// 用途
        "partCode": "01R42991R01",
        "partName": "曲轴位置传感器",				//  零件描述
        "qty": "1"		// 用量
    }]
};

export function applicabilityReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_APPLICABILITY:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

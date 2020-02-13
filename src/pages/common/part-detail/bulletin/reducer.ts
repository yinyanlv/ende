import * as actions from './actions';

const initialState = {
    list: [{
        "applicableBook": "N1",
        "applicableBookDesc": "五菱之光，五菱扬光",		//车辆型号
        "applicablePartNumber": "24530062,24530063,24530076,24530077",
        "code": "ASE-2009-005",					// 通讯编号
        "date": "2009/10/19 0:00:00",				//发布时间
        "fileName": "ASE-2009-005.pdf",
        "filePath": "http://res3.servision.com.cn/tis/pac/sgmw/bulletinfile/ASE-2009-005.pdf",
        "new": null,
        "title": "N1系列客车车型主线束订购"			// 主题
    }]
};

export function bulletinReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_BULLETIN:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

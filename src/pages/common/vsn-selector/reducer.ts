import * as actions from './actions';

const initialState = {
    isShow: false,
    list: [{
        "beginDate": null, // 开始时间
        "brand": "BAOJUN",   //品牌编码
        "brandName": "宝骏", // 品牌名称
        "catalog": "E100", // 目录
        "catalogName": "宝骏E100", // 目录名称
        "code": "1MXR", // 品种代码
        "endDate": null, // 结束时间
        "model": "WC",  // 车型
        "modelName": "WC - 智行版(LV1)", // 车型名称
        "vehicleCode": "LZW7001EVABE"  //车辆型号
    },
    {
        "beginDate": null,
        "brand": null,
        "brandName": null,
        "catalog": "E100",
        "catalogName": "宝骏E100",
        "code": "1MXR",
        "endDate": null,
        "model": "WC",
        "modelName": "WC - 智行版(LV1)",
        "vehicleCode": "LZW7001EVABE"
    }]
};

export function vsnSelectorReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_VSN_SELECTOR:
            return {
                isShow: action.payload.isShow,
                list: action.payload.list || []
            };
        default:
            return state;
    }
}

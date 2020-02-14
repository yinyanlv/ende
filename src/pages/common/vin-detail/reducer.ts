import * as actions from './actions';

const initialState = {
    isShow: false,
    type: 'vin',
    data: {
        "code": "LK6ADCE29JB014434",
        "mappings": {
            "m_1": "BAOJUN",
            "m_2": "E100",
            "m_3": "-1",
            "m_4": "M201"
        },
        "vsnAirCondition": {
            "code": "G",

            "name": "前置空调，冷媒HFC-134A"
        },
        "vsnBatch": null,
        "vsnColor": {
            "code": "KH",
            "name": "钢琴黑/琉璃红"
        },
        "vsnEngine": {
            "code": "02",
            "displacement": "110",
            "manufacturerName": "浙江方正电机股份有限公司",
            "name": "ETG029",
            "note": "适用车型 LZW7000EVA/LZW7001EVA     &LV0/LV1",
            "power": "29"
        },
        "vsnIdentifier": null,
        "vsnTransmission": null,
        "vsnVariety": {
            "beginDate": null,
            "brand": "BAOJUN",
            "brandName": "宝骏",
            "catalog": "E100",
            "catalogName": "宝骏E100",
            "code": "1MXR",
            "endDate": null,
            "model": "WC",
            "modelName": "WC - 智行版(LV1)",
            "vehicleCode": "LZW7001EVABE"
        }
    }
};

export function vinDetailReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_VIN_DETAIL:
            return {
                isShow: action.payload.isShow,
                type: action.payload.type || 'vin',
                data: action.payload.data || {}
            };
        default:
            return state;
    }
}

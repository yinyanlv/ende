import {combineReducers} from 'redux';
import * as actions from './actions';
import {queryReducer} from './query/reducer';

const initialState = {
    isShow: false,
    queryParams: {},
    list: [{
        "amount": {
            "formatString": "￥437.06",	//小计
            "value": 437.06
        },
        "applyList": [		//使用车型
            {
                "code": "GP53",
                "name": "宝骏630 2016款"
            },
            {
                "code": "CN101",
                "name": "五菱宏光2014款"
            },
            {
                "code": "OF",
                "name": "OF - 24小时在线旗舰型(LV4)"
            },
            {
                "code": "CN113",
                "name": "五菱宏光S1"
            },
            {
                "code": "CN201A",
                "name": "五菱730"
            },
            {
                "code": "CN210MR",
                "name": "CORTEZ"
            },
            {
                "code": "CN210S",
                "name": "新宝骏RS-5"
            }
        ],
        "canSale": true,					//是否可以订购
        "id": "132",
        "partCode": "01R40512X01",		// 零件号
        "partName": "发动机线束总成",		//零件名称
        "partNote": null,					//配件备注
        "price": {
            "formatString": "￥218.53",		// 单价
            "value": 218.53
        },
        "qty": 2,				//数量
        "reasonCode": null,			//不能订购原因
        "selected": true,		//是否选中
        "unitPkgPackage": 1	//最小包装数
    }],
    total: 1111110,
    pageNo: 199,
    pageSize: 10
};

function shoppingCartReducer(state = initialState, action) {
    switch (action.type) {
        case actions.IS_SHOW_SHOPPING_CART:
            return {
                ...state,
                isShow: action.payload.isShow
            };
        default:
            return state;
    }
}

export const shoppingCartReducers = combineReducers({
    self: shoppingCartReducer,
    query: queryReducer
});


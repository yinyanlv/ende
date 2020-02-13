import * as actions from './actions';

const initialState = {
    "code": "01R42991R01", 	// 零件编号
    "coverImageUri": "/tis/epc/sgmw/legend/image/4eea8373eb0e01090b1711aa62b490b6.jpg",
    "extra1": null,
    "general": false,
    "hasSupersession": false,
    "height": null,
    "id": "01R42991R01",
    "imageUris": [					//配件照片
        {
            "fileUri": "/tis/epc/sgmw/legend/image/4eea8373eb0e01090b1711aa62b490b6.jpg",
            "sort": 1
        },
        {
            "fileUri": "/tis/epc/sgmw/legend/image/62ced975f4b68a3e24b50ae1b6f92281.jpg",
            "sort": 1
        }
    ],
    "length": null,
    "minOrderQty": null,
    "modelCode": null,
    "name": "曲轴位置传感器",			//零件名称
    "note": "",						//备注
    "position": "PA00",					//库位
    "price": null,
    "qty": 0,
    "saleProps": {
        "canSale": true,			//能否加入购物车
        "price": {				//价格
            "formatString": "￥66.77",
            "value": 66.77
        },
        "reasonCode": "OK"
    },
    "supplierCode": null,
    "transportRestrict": null,				// 运输方式
    "typeName": null,
    "unitName": null,
    "unitPkgQty": 1,			//最小包装数
    "weight": null,
    "width": null

};

export function partInfoReducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_PART_INFO:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

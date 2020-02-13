import * as actions from './actions';

const initialState = {
    list: [{
        "code": "23513587",   			// 零件号
        "coverImageUri": null,  		// 零件照片
        "extra1": null,
        "general": false,
        "hasSupersession": true,
        "height": null,
        "id": "23513587",
        "length": null,
        "minOrderQty": null,
        "modelCode": null,
        "name": "螺栓M6X12",		//零件名称
        "note": "",					//零件备注
        "position": null,				//库位
        "price": null,					//价格
        "qty": 0,
        "supplierCode": null,
        "transportRestrict": null,		//运输方式
        "typeName": null,
        "unitName": null,
        "unitPkgQty": 5,		//最小包装数
        "weight": null,
        "width": null
    }],
    total: 50,
    pageNo: 1,
    pageSize: 10
};

export function partsReducer(state = initialState, action) {
    switch(action.type) {
        case actions.SET_PARTS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

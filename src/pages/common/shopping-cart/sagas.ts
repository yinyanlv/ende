import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import history from '@/common/history';
import {buildQueryParams} from '@/common/utils';
import {navCreator} from '@/pages/common/header/nav/actions';
import * as actions from './actions';
import {querySaga} from './query/saga';
import {orderDetailCreator} from '@/pages/order-detail/actions';
import {partDetailCreator} from '@/pages/common/part-detail/actions';
import {getText} from '@/pages/common/intl';
import {shoppingCartCreator} from './actions';
import {applicabilityCreator} from '@/pages/common/search/advance-search/applicability/actions';
import {partsCreator as searchPartsCreator} from '@/pages/common/search/advance-search/parts/actions';
import {partsCreator} from '@/pages/usage/parts/actions';
import {partInfoCreator} from '@/pages/common/part-detail/part-info/actions';

function* doQueryController(action) {
    try {
        yield put(actions.shoppingCartCreator.setIsLoading({isLoading: true}));
        action.payload.sorts = [{field: 'modifiedDate', asc: false}];
        const data = yield call(doQuery, action.payload);
        yield put(actions.shoppingCartCreator.setSelectedRecords([]));
        yield put(actions.shoppingCartCreator.setShoppingCart(data));
        yield put(actions.shoppingCartCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        yield put(actions.shoppingCartCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/cart/page', params);
}

function* addToCartController(action) {
    try {
        yield call(addToCart, action.payload);
        yield put(navCreator.loadCartCount());
        const params = buildQueryParams();
        yield put(actions.shoppingCartCreator.doQuery(params));
        const codes = [action.payload.partCode];

        yield* updateCartRelateData(codes, true);

        message.success(getText('msg.a11'));
    } catch(err) {
        message.error(err.message);
    }
}

function addToCart(params) {
    return http.post('/cart/add', {
        partCode: params.partCode
    });
}

function* deleteFromCartController(action) {
    try {
        yield call(deleteFromCart, action.payload);
        yield put(navCreator.loadCartCount());
        yield put(actions.shoppingCartCreator.doQuery(buildQueryParams()));
        const codes = action.payload.codes;
        yield* updateCartRelateData(codes, false);
        message.success(getText('msg.a12'));
    } catch(err) {
        message.error(err.message);
    }
}

function* updateCartRelateData(partCodes, value) {

    yield put(applicabilityCreator.updateRecords({
        partCodes: partCodes,
        value
    }));
    yield put(searchPartsCreator.updateRecords({
        partCodes: partCodes,
        value
    }));
    yield put(partsCreator.updateRecords({
        partCodes: partCodes,
        value
    }));
    if (partCodes && partCodes.length) {
        yield put(partInfoCreator.updatePartInfo({
            code: partCodes[0],
            cart: value
        }));
    }
}

function deleteFromCart(params) {
    return http.post('/cart/delete', {
        codes: params.codes
    });
}

function* editPartCartCountController(action) {
    try {
        const data = yield call(editPartCartCount, action.payload);
        const partCode = action.payload.partCode;
        const list = action.payload.list;
        const tip = data.tip;
        if (tip) {
            message.success(tip);
        }

        if (list && list.length) {
            const newList = updateRecord(partCode, list, {
                qty: data.qty,
                amount: data.amount
            });

            yield put(actions.shoppingCartCreator.updateRecord(newList));
        }

        yield put(navCreator.loadCartCount());
    } catch(err) {
        message.error(err.message);
    }
}

function updateRecord(partCode, list, params) {
    return list.map((item) => {
        if (item.partCode === partCode) {
           item.amount = params.amount;
           item.qty = params.qty;
        }
        return item;
    });
}

function editPartCartCount(params) {
    return http.post('/cart/update-qty', {
        partCode: params.partCode,
        qty: params.qty
    });
}

function* addAndShowShoppingCartController(action) {
    const payload = action.payload;
    yield put(actions.shoppingCartCreator.addToCart({partCode: payload.partCode}));
    yield put(actions.shoppingCartCreator.setIsShowShoppingCart({
        isShow: true,
        zIndex: action.payload.zIndex
    }));
}

function* generateOrderController() {
    try {
        const data = yield call(generateOrder);
        if (data.orderNo) {
            history.push({
                pathname: `/order/${data.orderNo}`
            });
            if (/^\/order\/.+/.test(history.location.pathname)) {
                yield put(orderDetailCreator.initOrderDetail({
                    orderCode: data.orderNo
                }));
            }
            yield put(navCreator.loadCartCount());
            yield put(actions.shoppingCartCreator.setIsShowShoppingCart({
                isShow: false
            }));
            yield put(partDetailCreator.setIsShowPartDetail({
                isShow: false
            }));
        }
        yield put(shoppingCartCreator.setIsGenerating({isGenerating: false}));
    } catch(err) {
        yield put(shoppingCartCreator.setIsGenerating({isGenerating: false}));
        message.error(err.message);
    }
}

function generateOrder() {
    return http.post('/cart/submit');
}

function* shoppingCartSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.ADD_TO_CART, addToCartController);
    yield takeLatest(actions.DELETE_FROM_CART, deleteFromCartController);
    yield takeLatest(actions.EDIT_PART_CART_COUNT, editPartCartCountController);
    yield takeLatest(actions.ADD_AND_SHOW_SHOPPING_CART, addAndShowShoppingCartController);
    yield takeLatest(actions.GENERATE_ORDER, generateOrderController);
}

export function* shoppingCartSagas() {
    yield all([
        fork(querySaga),
        fork(shoppingCartSaga)
    ]);
}

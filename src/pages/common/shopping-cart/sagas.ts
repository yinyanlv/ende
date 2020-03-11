import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import history from '@/common/history';
import {buildQueryParams} from '@/common/utils';
import {navCreator} from '@/pages/common/header/nav/actions';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        yield put(actions.shoppingCartCreator.setIsLoading({isLoading: true}));
        const data = yield call(doQuery, action.payload);
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
        message.success('加入成功');
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
        message.success('删除成功');
    } catch(err) {
        message.error(err.message);
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
        const newList = updateRecord(partCode, list, {
            qty: data.qty,
            amount: data.amount
        });

        yield put(actions.shoppingCartCreator.updateRecord(newList));
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
    const params = buildQueryParams();
    yield put(actions.shoppingCartCreator.addToCart({partCode: payload.partCode}));
    yield put(actions.shoppingCartCreator.setIsShowShoppingCart({
        isShow: true
    }));

    yield put(actions.shoppingCartCreator.doQuery(params));
}

function* generateOrderController() {
    try {
        const data = yield call(generateOrder);
        if (data.orderNo) {
            history.push({
               pathname: `/order/${data.orderNo}`
            });

            yield put(actions.shoppingCartCreator.setIsShowShoppingCart({
                isShow: false
            }));
        }
    } catch(err) {
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

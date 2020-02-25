import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams} from '@/common/utils';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        const data = yield call(doQuery, action.payload);
        yield put(actions.shoppingCartCreator.setShoppingCart(data));
    } catch(err) {
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/cart/page', params);
}

function* addToCartController(action) {
    try {
        const data = yield call(addToCart, action.payload);
        message.success('成功加入购物车');
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
        const data = yield call(deleteFromCart, action.payload);
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
    } catch(err) {
        message.error(err.message);
    }
}

function editPartCartCount(params) {
    return http.post('/cart/update-qty', {
        partCode: params.partCode,
        qty: params.qty
    });
}

function* addAndShowShoppingCart(action) {
    const payload = action.payload;
    const params = buildQueryParams();
    yield put(actions.shoppingCartCreator.addToCart({partCode: payload.partCode}));
    yield put(actions.shoppingCartCreator.setIsShowShoppingCart({
        isShow: true
    }));
    yield put(actions.shoppingCartCreator.doQuery(params));
}

function* shoppingCartSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.ADD_TO_CART, addToCartController);
    yield takeLatest(actions.DELETE_FROM_CART, deleteFromCartController);
    yield takeLatest(actions.EDIT_PART_CART_COUNT, editPartCartCountController);
    yield takeLatest(actions.ADD_AND_SHOW_SHOPPING_CART, addAndShowShoppingCart);
}

export function* shoppingCartSagas() {
    yield all([
        fork(querySaga),
        fork(shoppingCartSaga)
    ]);
}

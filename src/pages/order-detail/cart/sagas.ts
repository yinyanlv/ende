import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams} from '@/common/utils';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        yield put(actions.cartCreator.setIsLoading({isLoading: true}));
        const data = yield call(doQuery, action.payload);
        yield put(actions.cartCreator.setCart(data));
        yield put(actions.cartCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        yield put(actions.cartCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/order-detail/page', params);
}

function* deletePartController(action) {
    try {
        yield call(deletePart, action.payload);
        yield put(actions.cartCreator.doQuery(buildQueryParams()));
        message.success('删除成功');
    } catch(err) {
        message.error(err.message);
    }
}

function deletePart(params) {
    return http.post('/order-detail/delete', {
        orderCode: params.orderCode,
        partCodes: params.partCodes
    });
}

function* addPartController(action) {
    try {
        yield call(addPart, action.payload);
        yield put(actions.cartCreator.doQuery(buildQueryParams()));
        message.success('加入成功');
    } catch(err) {
        message.error(err.message);
    }
}

function addPart(params) {
    return http.post('/order-detail/add', {
        orderCode: params.orderCode,
        partCode: params.partCode
    });
}

function* editQtyController(action) {
    try {
        yield call(editQty, action.payload);
    } catch(err) {
        message.error(err.message);
    }
}

function editQty(params) {
    return http.post('/order-detail/update-qty', {
        orderCode: params.orderCode,
        partCode: params.partCode,
        qty: params.qty
    });
}

function* cartSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.DELETE_PART, deletePartController);
    yield takeLatest(actions.ADD_PART, addPartController);
    yield takeLatest(actions.EDIT_QTY, editQtyController);
}

export function* cartSagas() {
    yield all([
        fork(querySaga),
        fork(cartSaga)
    ]);
}

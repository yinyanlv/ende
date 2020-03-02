import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams} from '@/common/utils';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        yield put(actions.ordersCreator.setIsLoading({isLoading: true}));
        const data = yield call(doQuery, action.payload);
        yield put(actions.ordersCreator.setOrders(data));
        yield put(actions.ordersCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/order/page', params);
}

function* deleteOrderController(action) {
    try {
        yield call(deleteOrder, action.payload);
        yield put(actions.ordersCreator.doQuery(buildQueryParams()));
        message.success('删除成功');
    } catch(err) {
        message.error(err.message);
    }
}

function deleteOrder(params) {
    return http.post('/order-remove', {
        orderCode: params.orderCode
    });
}

function* ordersSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.DELETE_ORDER, deleteOrderController);
}

export function* ordersSagas() {
    yield all([
        fork(querySaga),
        fork(ordersSaga)
    ]);
}

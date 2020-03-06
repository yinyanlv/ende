import {put, all, call, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import history from '@/common/history';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import * as actions from './actions';
import {infoCreator} from './info/actions';
import {cartCreator} from './cart/actions';
import {purchaserCreator} from './purchaser/actions';
import {receiverCreator} from './receiver/actions';
import {infoSaga} from './info/saga';
import {cartSagas} from './cart/sagas';
import {purchaserSagas} from './purchaser/sagas';
import {receiverSagas} from './receiver/sagas';
import {uploadSaga} from './upload/saga';
import {API_PREFIX} from '@/config';

function* initOrderDetailController(action) {
    const orderCode = action.payload.orderCode;
    const filters = rebuildFieldsToFilters({
        orderCode
    });
    yield put(actions.orderDetailCreator.loadInfo({
        orderCode
    }));
    yield put(cartCreator.doQuery(buildQueryParams(filters)));
    yield put(actions.orderDetailCreator.setOrderCode({
        orderCode
    }));
}

function* loadInfoController(action) {
    try {
        const info = yield call(loadInfo, action.payload);
        yield put(actions.orderDetailCreator.setInfo(info));
        yield put(infoCreator.setFieldsValue(info));
        yield put(purchaserCreator.setInfo(info.purchaser));
        yield put(receiverCreator.setInfo(info.receiver));
    } catch (err) {
        message.error(err.message);
    }
}

function loadInfo(params) {
    return http.get(`/order-detail?orderCode=${params.orderCode}`);
}

function* saveAsNewOrderController(action) {
    try {
        const orderCode = yield call(saveAsNewOrder, action.payload);
        history.push({
            pathname: `/order/${orderCode}`
        });
        yield put(actions.orderDetailCreator.initOrderDetail({
            orderCode
        }));
    } catch (err) {
        message.error(err.message);
    }
}

function saveAsNewOrder(params) {
    return http.post(`/order/saveas`, {
       orderCode: params.orderCode
    });
}

function* deleteOrderController(action) {
    try {
        yield call(deleteOrder, action.payload);
        history.push({
            pathname: '/orders'
        });
    } catch (err) {
        message.error(err.message);
    }
}

function deleteOrder(params) {
    return http.post(`/order/remove`, {
        orderCode: params.orderCode
    });
}

function* saveOrderController(action) {
    try {
        yield call(saveOrder, action.payload);
        history.push({
            pathname: '/orders'
        });
    } catch (err) {
        message.error(err.message);
    }
}

function saveOrder(params) {
    return http.post('/order-detail/save', params);
}

function* exportOrderController(action) {
    try {
        const orderCode = action.payload.orderCode;
        window.open(`${API_PREFIX}/order-detail/export?orderCode=${orderCode}`);
        yield call(saveOrder, action.payload);
    } catch (err) {
        message.error(err.message);
    }
}


function* orderDetailSaga() {
    yield takeLatest(actions.INIT_ORDER_DETAIL, initOrderDetailController);
    yield takeLatest(actions.LOAD_INFO, loadInfoController);
    yield takeLatest(actions.SAVE_AS_NEW_ORDER, saveAsNewOrderController);
    yield takeLatest(actions.DELETE_ORDER, deleteOrderController);
    yield takeLatest(actions.SAVE_ORDER, saveOrderController);
    yield takeLatest(actions.EXPORT_ORDER, exportOrderController);
}

export function* orderDetailSagas() {
    yield all([
        fork(orderDetailSaga),
        fork(infoSaga),
        fork(cartSagas),
        fork(purchaserSagas),
        fork(receiverSagas),
        fork(uploadSaga)
    ]);
}
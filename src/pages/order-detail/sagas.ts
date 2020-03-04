import {put, all, call, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import * as actions from './actions';
import {cartCreator} from './cart/actions';
import {infoSaga} from './info/saga';

function* initOrderDetailController(action) {
    const orderCode = action.payload.orderCode;
    const filters = rebuildFieldsToFilters({
        orderCode
    });
    yield put(actions.orderDetailCreator.loadInfo({
        orderCode
    }));
    yield put(cartCreator.doQuery(buildQueryParams(filters)));
}

function* loadInfoController(action) {
    try {
        yield call(loadInfo, action.payload)
    } catch (err) {
        message.error(err.message);
    }
}

function loadInfo(params) {
    return http.get(`order-detail?orderCode=${params.orderCode}`);
}

function* orderDetailSaga() {
    yield takeLatest(actions.INIT_ORDER_DETAIL, initOrderDetailController);
    yield takeLatest(actions.LOAD_INFO, initOrderDetailController);
}

export function* orderDetailSagas() {
    yield all([
        fork(orderDetailSaga),
        fork(infoSaga)
    ]);
}

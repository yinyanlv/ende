import {put, all, call, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams, rebuildFieldsToFilters} from '@/common/utils';
import * as actions from './actions';
import {cartCreator} from './cart/actions';
import {infoSaga} from './info/saga';
import {cartSagas} from './cart/sagas';
import {purchaserSaga} from './purchaser/saga';

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

    } catch (err) {
        message.error(err.message);
    }
}

function loadInfo(params) {
    return http.get(`order-detail?orderCode=${params.orderCode}`);
}

function* orderDetailSaga() {
    yield takeLatest(actions.INIT_ORDER_DETAIL, initOrderDetailController);
    yield takeLatest(actions.LOAD_INFO, loadInfoController);
}

export function* orderDetailSagas() {
    yield all([
        fork(orderDetailSaga),
        fork(infoSaga),
        fork(cartSagas),
        fork(purchaserSaga)
    ]);
}

import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams} from '@/common/utils';
import * as actions from './actions';
import {querySaga} from './query/saga';
import {getText} from '@/pages/common/intl';
import {crumbsCreator} from '@/pages/common/crumbs/actions';

function* initOrdersController() {
    const crumbs = getCrumbs();
    yield put(crumbsCreator.setCrumbs(crumbs));
    const sorts = [{field: 'createdDate', asc: false}];
    yield put(actions.ordersCreator.doQuery(buildQueryParams([], 1, 10, sorts)));
}

function getCrumbs() {
    return [{
        code: '-1',
        label: '',
        name: getText('order.a1'),
        url: ''
    }];
}

function* doQueryController(action) {
    try {
        yield put(actions.ordersCreator.setIsLoading({isLoading: true}));
        yield put(actions.ordersCreator.setQueryParams(action.payload));
        const data = yield call(doQuery, action.payload);
        yield put(actions.ordersCreator.setOrders(data));
        yield put(actions.ordersCreator.setIsLoading({isLoading: false}));
    } catch (err) {
        yield put(actions.ordersCreator.setIsLoading({isLoading: false}));
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
        message.success(getText('msg.a12'));
    } catch (err) {
        message.error(err.message);
    }
}

function deleteOrder(params) {
    return http.post('/order/remove', {
        orderCode: params.orderCode
    });
}

function* ordersSaga() {
    yield takeLatest(actions.INIT_ORDERS, initOrdersController);
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.DELETE_ORDER, deleteOrderController);
}

export function* ordersSagas() {
    yield all([
        fork(querySaga),
        fork(ordersSaga)
    ]);
}

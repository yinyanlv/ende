import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams} from '@/common/utils';
import {navCreator} from '@/pages/common/header/nav/actions';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        yield put(actions.cartCreator.setIsLoading({isLoading: true}));
        const data = yield call(doQuery, action.payload);
        yield put(actions.cartCreator.setCart(data));
        yield put(actions.cartCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/order/page', params);
}

function* deletePartController(action) {
    try {
        yield call(deleteCart, action.payload);
        yield put(actions.cartCreator.doQuery(buildQueryParams()));
        message.success('删除成功');
    } catch(err) {
        message.error(err.message);
    }
}

function deleteCart(params) {
    return http.post('/cart/delete', {
        codes: params.codes
    });
}

function* cartSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.DELETE_PART, deletePartController);
}

export function* cartSagas() {
    yield all([
        fork(querySaga),
        fork(cartSaga)
    ]);
}

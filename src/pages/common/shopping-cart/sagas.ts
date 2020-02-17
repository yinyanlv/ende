import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* shoppingCartQueryController(action) {
    const data = yield call(shoppingCartQuery, action.payload);
    put(actions.shoppingCartCreator.setShoppingCart(data));
}

function shoppingCartQuery(params) {
    return http.post('/cart/page', params);
}

function* shoppingCartSaga() {
    yield takeLatest(actions.DO_QUERY, shoppingCartQueryController);
}

export function* shoppingCartSagas() {
    yield all([
        fork(querySaga),
        fork(shoppingCartSaga)
    ]);
}

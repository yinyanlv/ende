import {put, call, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadCartCountController() {
    try {
        const data = yield call(loadCartCount);

    } catch (err) {

    }
}

function loadCartCount() {
    return http.get('/cart/num');
}

export function* navSaga() {
    yield takeLatest(actions.LOAD_CART_COUNT, loadCartCountController);
}
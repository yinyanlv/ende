import {put, call, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadCartCountController() {
    try {
        const data = yield call(loadCartCount);

        yield put(actions.navCreator.setCartCount({cartCount: data.num}))
    } catch (err) {
        message.error(err.message);
    }
}

function loadCartCount() {
    return http.get('/cart/num');
}

function* logoutController() {
    try {
        yield call(logout);

    } catch (err) {
        message.error(err.message);
    }
}

function logout() {
    return http.get('/logout');
}

export function* navSaga() {
    yield takeLatest(actions.LOAD_CART_COUNT, loadCartCountController);
    yield takeLatest(actions.LOGOUT, logoutController);
}

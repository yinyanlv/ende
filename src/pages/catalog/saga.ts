import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadBrandsController(action) {
    try {
        const data = yield call(loadBrands);

        yield put(actions.loadBrandsActionCreator.success(data));
    } catch (err) {
        yield put(actions.loadBrandsActionCreator.failed(err.message));
    }
}

export function *catalogSaga() {
    yield takeLatest(actions.LOAD_BRANDS, loadBrandsController);
}

export function loadBrands() {
    return http.get('/load-brands');
}

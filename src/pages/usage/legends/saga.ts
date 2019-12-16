import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadLegendsController(action) {
    try {
        const params = action.payload;
        const legends = yield call(loadLegends, params);
        yield put(actions.legendsCreator.success(legends));
    } catch (err) {
        yield put(actions.legendsCreator.failed(err.message));
    }
}

function loadLegends(params) {
    return http.post('/usage/struct/flat-descendant', params);
}

export function* legendsSaga() {
    yield takeLatest(actions.LOAD_LEGENDS, loadLegendsController);
}


import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import {groupsSaga} from './groups/saga';

function* loadLegendsController(action) {
    try {
        const params = action.payload;
        const legends = yield call(loadLegends, params);
        yield put(actions.legendsCreator.success(legends));
    } catch (err) {
        yield put(actions.legendsCreator.failed(err.message));
    }
}

function* loadPartsController(action) {
    try {
        const params = action.payload;
        const parts = yield call(loadParts, params);
        yield put(actions.partsCreator.success(parts));
    } catch (err) {
        yield put(actions.partsCreator.failed(err.message));
    }
}

function loadLegends(params) {
    return http.post('/usage/struct/flat-descendant', params);
}

function loadParts(params) {
   return http.post('/usage/parts', params);
}

export function* usageSaga() {
    yield all([
        fork(groupsSaga)
    ]);
    yield takeLatest(actions.LOAD_LEGENDS, loadLegendsController);
    yield takeLatest(actions.LOAD_PARTS, loadPartsController);
}


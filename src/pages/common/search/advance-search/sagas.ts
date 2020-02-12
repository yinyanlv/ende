import {all, put, call, fork, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import {querySaga} from './query/saga';
import {applicabilitySaga} from './applicability/saga';
import {partsSaga} from './parts/saga';
import {legendsSaga} from './legends/saga';
import {applicabilityCreator} from './applicability/actions';
import {partsCreator} from './parts/actions';
import {legendsCreator} from './legends/actions';

function* doQueryController(action) {
    const params = action.payload;
    yield put(actions.advanceSearchCreator.setQueryParams(params));
    yield put(actions.advanceSearchCreator.loadCount(params));
    yield put(applicabilityCreator.doQuery(params));
    yield put(partsCreator.doQuery(params));
    yield put(legendsCreator.doQuery(params));
}

function* loadCountController(action) {
    const data = yield call(loadCount, action.payload);
    yield put(actions.advanceSearchCreator.setCount(data));
}

function loadCount(params) {
    return http.post('/search/statics', params);
}

function* advanceSearchSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.LOAD_COUNT, loadCountController);
}

export function* advanceSearchSagas() {
    yield all([
        fork(advanceSearchSaga),
        fork(querySaga),
        fork(applicabilitySaga),
        fork(partsSaga),
        fork(legendsSaga)
    ]);
}

import {all, put, call, fork, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import {message} from 'antd';
import * as actions from './actions';
import {querySaga} from './query/saga';
import {applicabilitySaga} from './applicability/saga';
import {partsSaga} from './parts/saga';
import {legendsSaga} from './legends/saga';
import {queryCreator} from './query/actions';
import {applicabilityCreator} from './applicability/actions';
import {partsCreator} from './parts/actions';
import {legendsCreator} from './legends/actions';

function* doQueryController(action) {
    try {
        const params = action.payload;

        yield put(actions.advanceSearchCreator.setQueryParams(params));
        yield put(actions.advanceSearchCreator.loadCount(params));
        yield put(applicabilityCreator.doQuery(params));
        yield put(partsCreator.doQuery(params));
        yield put(legendsCreator.doQuery(params));
    } catch(err) {
        message.error(err.message);
    }
}

function* loadCountController(action) {
    try {
        const data = yield call(loadCount, action.payload);
        yield put(actions.advanceSearchCreator.setCount(data));
    } catch(err) {

    }
}

function loadCount(params) {
    return http.post('/search/statics', params);
}

function* resetChildrenStateController() {
    yield put(queryCreator.resetState());
    yield put(applicabilityCreator.resetState());
    yield put(partsCreator.resetState());
    yield put(legendsCreator.resetState());
}

function* advanceSearchSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.LOAD_COUNT, loadCountController);
    yield takeLatest(actions.RESET_CHILDREN_STATE, resetChildrenStateController);
}

export function* advanceSearchSagas() {
    yield all([
        fork(querySaga),
        fork(advanceSearchSaga),
        fork(applicabilitySaga),
        fork(partsSaga),
        fork(legendsSaga)
    ]);
}

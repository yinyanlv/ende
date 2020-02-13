import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* replaceQueryController(action) {
    const data = yield call(replaceQuery, action.payload);
    put(actions.replaceCreator.setReplace(data));
}

function replaceQuery(partCode) {
    return http.post('/supersession', {
        partCode
    });
}

function* replaceSaga() {
    yield takeLatest(actions.DO_QUERY, replaceQueryController);
}

export function* replaceSagas() {
    yield all([
        fork(querySaga),
        fork(replaceSaga)
    ]);
}

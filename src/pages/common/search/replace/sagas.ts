import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* replaceQueryController(action) {
    try {
        yield put(actions.replaceCreator.setPartCode(action.payload));
        const list = yield call(replaceQuery, action.payload);
        yield put(actions.replaceCreator.setReplace(list));
    } catch(err) {
        message.error(err.message);
    }
}

function replaceQuery(params) {
    return http.post('/supersession', {
        partCode: params.partCode
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

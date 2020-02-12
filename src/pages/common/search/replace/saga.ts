import {put, call, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* replaceQueryController(action) {
    const data = yield call(replaceQuery, action.payload);
    put(actions.replaceCreator.setReplace(data));
}

function replaceQuery(partCode) {
    return http.post('/supersession', {
        partCode
    });
}

export function* replaceSaga() {
    yield takeLatest(actions.DO_QUERY, replaceQueryController);
}

import {put, call, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* replaceQueryController(action) {
    const data = yield call(replaceQuery, action.payload);
    put(actions.replaceCreator.setReplaceList(data));
}

function replaceQuery(params) {
    return http.post('/supersession', {
        partCode: params.value
    });
}

export function* replaceSaga() {
    yield takeLatest(actions.REPLACE_QUERY, replaceQueryController);
}

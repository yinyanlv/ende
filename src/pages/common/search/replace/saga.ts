import {put, call, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

export function* replaceSaga() {
    yield takeLatest(actions.QUERY_REPLACE, queryReplaceController);
}

function* queryReplaceController(action) {
    const data = yield call(queryReplace, action.payload);
    put(actions.replaceCreator.setReplaceList(data));
}

function queryReplace(params) {
    return http.post('supersession', {
        partCode: params.value
    });
}

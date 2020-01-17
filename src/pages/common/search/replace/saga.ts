import {put, call, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

export function* replaceSaga() {
    yield takeLatest(actions.REPLACE_SEARCH, replaceSearchController);
}

function* replaceSearchController(action) {
    const data = yield call(searchReplace, action.payload);
}

function searchReplace(params) {
    return http.post('supersession', {
        partCode: params.value
    });
}

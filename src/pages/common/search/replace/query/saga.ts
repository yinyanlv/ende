import {takeLatest, takeEvery, call, put} from 'redux-saga/effects';
import * as actions from './actions';
import {replaceCreator} from '../actions';

function* doQueryController(action) {
    yield put(replaceCreator.doQuery(action.payload));
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}
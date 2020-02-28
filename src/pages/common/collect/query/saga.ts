import {takeLatest, takeEvery, call, put} from 'redux-saga/effects';
import * as actions from './actions';
import {collectCreator} from '../actions';

function* doQueryController(action) {
    yield put(collectCreator.doQuery(action.payload));
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

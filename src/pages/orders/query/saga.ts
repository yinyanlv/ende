import {takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {ordersCreator} from '../actions';

function* doQueryController(action) {
    yield put(ordersCreator.doQuery(action.payload));
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

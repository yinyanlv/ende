import {takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {shoppingCartCreator} from '../actions';

function* doQueryController(action) {
    yield put(shoppingCartCreator.doQuery(action.payload));
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

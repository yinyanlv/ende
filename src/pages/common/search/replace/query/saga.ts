import {takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {replaceCreator} from '../actions';

function* doQueryController(action) {
    try {
        yield put(replaceCreator.doQuery(action.payload));
    } catch(err) {
        message.error(err.message);
    }
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

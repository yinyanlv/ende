import {takeLatest, put, call} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {listCreator} from '../list/actions';

function* createRecordController(action) {
    try {
        yield call(createRecord, action.payload);
        yield put(listCreator.loadList());
    } catch(err) {
        message.error(err.message);
    }
}

function createRecord(params) {
    return http.post('/order/receiver/save', params);
}

export function* editSaga() {
    yield takeLatest(actions.CREATE_RECORD, createRecordController);
    yield takeLatest(actions.EDIT_RECORD, createRecordController);
}

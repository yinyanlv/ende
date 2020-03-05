import {takeLatest, put, call, all, fork} from 'redux-saga/effects';
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
    return http.post('/order/purchaser/save', params);
}

export function* editSaga() {
    yield takeLatest(actions.CREATE_RECORD, createRecordController);
    yield takeLatest(actions.EDIT_RECORD, createRecordController);
}

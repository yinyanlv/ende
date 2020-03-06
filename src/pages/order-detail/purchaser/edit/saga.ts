import {takeLatest, put, call, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {listCreator} from '../list/actions';

function* editRecordController(action) {
    try {
        yield call(editRecord, action.payload);
        yield put(listCreator.loadList());
        yield put(actions.editCreator.setIsShowEdit({
            isShow: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function editRecord(params) {
    return http.post('/order/purchaser/save', params);
}

export function* editSaga() {
    yield takeLatest(actions.EDIT_RECORD, editRecordController);
}

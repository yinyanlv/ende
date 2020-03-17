import {takeLatest, put, call} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {listCreator} from '../list/actions';

function* editRecordController(action) {
    try {
        const type = action.payload.type;
        yield call(editRecord, action.payload);
        yield put(listCreator.loadList({
            type
        }));
        yield put(actions.editCreator.setIsShowEdit({
            isShow: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

const EDIT_URL_MAP = {
    purchaser: '/order/purchaser/save',
    receiver: '/order/receiver/save'
};

function editRecord(params) {
    const type = params.type;
    delete params.type;
    return http.post(EDIT_URL_MAP[type], params);
}

export function* editSaga() {
    yield takeLatest(actions.EDIT_RECORD, editRecordController);
}

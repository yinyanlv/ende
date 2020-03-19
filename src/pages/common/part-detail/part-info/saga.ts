import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadPartInfoController(action) {
    try {
        const list = yield call(loadPartInfo, action.payload);
        yield put(actions.partInfoCreator.setPartInfo(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadPartInfo(params) {
    return http.post('/part/detail', {
        partCode: params.partCode
    });
}

export function* partInfoSaga() {
    yield takeLatest(actions.LOAD_PART_INFO, loadPartInfoController);
}

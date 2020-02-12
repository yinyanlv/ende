import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadPartInfoController(action) {
    const list = yield call(loadPartInfo, action.payload);

    yield put(actions.partInfoCreator.setPartInfo(list));
}

function loadPartInfo(partCode) {
    return http.post('/part/detail', {
        partCode
    });
}

export function* partInfoSaga() {
    yield takeLatest(actions.LOAD_PART_INFO, loadPartInfoController);
}
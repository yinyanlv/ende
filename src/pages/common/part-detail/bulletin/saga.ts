import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadBulletinController(action) {
    const list = yield call(loadBulletin, action.payload);

    yield put(actions.bulletinCreator.setBulletin(list));
}

function loadBulletin(partCode) {
    return http.post('/bulletin/list', {
        partCode
    });
}

export function* bulletinSaga() {
    yield takeLatest(actions.LOAD_BULLETIN, loadBulletinController);
}
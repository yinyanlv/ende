import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadBulletinController(action) {
    try {
        const list = yield call(loadBulletin, action.payload);
        yield put(actions.bulletinCreator.setBulletin(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadBulletin(params) {
    return http.post('/bulletin/list', {
        partCode: params.partCode
    });
}

export function* bulletinSaga() {
    yield takeLatest(actions.LOAD_BULLETIN, loadBulletinController);
}

import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadReplaceController(action) {
    try {
        const list = yield call(loadReplace, action.payload);
        yield put(actions.replaceCreator.setReplace(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadReplace(params) {
    return http.post('/supersession', {
        partCode: params.partCode
    });
}

export function* replaceSaga() {
    yield takeLatest(actions.LOAD_REPLACE, loadReplaceController);
}

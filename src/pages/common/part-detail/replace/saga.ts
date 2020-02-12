import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadReplaceController(action) {
    const list = yield call(loadReplace, action.payload);

    yield put(actions.replaceCreator.setReplace(list));
}

function loadReplace(partCode) {
    return http.post('/supersession', {
        partCode
    });
}

export function* replaceSaga() {
    yield takeLatest(actions.SET_REPLACE, loadReplaceController);
}
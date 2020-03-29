import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        yield put(actions.replaceCreator.setIsLoading({
            isLoading: true
        }));
        yield put(actions.replaceCreator.setPartCode(action.payload));
        const list = yield call(doQuery, action.payload);
        yield put(actions.replaceCreator.setReplace(list));
        yield put(actions.replaceCreator.setIsLoading({
            isLoading: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/supersession', {
        partCode: params.partCode
    });
}

function* resetChildrenStateController() {
    yield put(actions.replaceCreator.resetState());
}

function* replaceSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.RESET_CHILDREN_STATE, resetChildrenStateController);
}

export function* replaceSagas() {
    yield all([
        fork(querySaga),
        fork(replaceSaga)
    ]);
}

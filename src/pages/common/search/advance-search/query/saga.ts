import {takeLatest, call, put} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';
import {advanceSearchCreator} from '../actions';

function* loadGroupController() {
    try {
        const list = yield call(loadGroup);
        yield put(actions.queryCreator.setGroup(list));
    } catch(err) {

    }
}

function loadGroup() {
    return http.get('/combo/legend/group');
}

function* doQueryController(action) {
    yield put(advanceSearchCreator.doQuery(action.payload));
}

export function* querySaga() {
    yield takeLatest(actions.LOAD_GROUP, loadGroupController);
    yield takeLatest(actions.DO_QUERY, doQueryController);
}
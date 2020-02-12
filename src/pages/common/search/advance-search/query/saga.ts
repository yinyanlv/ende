import {takeLatest, call, put} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadGroupController() {
    try {
        const list = yield call(loadGroup);
        console.log(list);
        put(actions.queryCreator.setGroup(list));
    } catch(err) {

    }
}

function loadGroup() {
    return http.get('/combo/legend/group');
}

export function* querySaga() {
    yield takeLatest(actions.LOAD_GROUP, loadGroupController);
}
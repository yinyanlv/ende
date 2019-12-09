import {call, put, takeLatest} from 'redux-saga/effects';
import {http} from '@/common/http';
import * as actions from './actions';


function* loadGroupController(action) {
    try {
        const group = yield call(loadGroup);

        console.log(group);
    } catch (err) {
        yield put(actions.groupCreator.failed(err.message));
    }
}

function loadGroup() {
    return http.post('/usage');
}

function loadLegends() {
    return http.post('/usage/struct/flat-descendant');
}

function loadParts() {
    return http.post('/usage/parts');
}

export function* usageSaga() {
    yield takeLatest(actions.LOAD_GROUP, loadGroupController);
}


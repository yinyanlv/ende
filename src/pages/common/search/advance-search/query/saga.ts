import {takeLatest, takeEvery, call, put} from 'redux-saga/effects';
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

function* loadM1Controller() {
    try {
        const list = yield call(loadM1);
        yield put(actions.queryCreator.setM1(list));
    } catch(err) {

    }
}

function loadM1() {
    return http.get('/combo/m1');
}

function* loadM2Controller(action) {
    try {
        const list = yield call(loadM2, action.pyload);
        yield put(actions.queryCreator.setM2(list));
    } catch(err) {

    }
}

function loadM2(params) {
    return http.post('/combo/m2', params);
}

function* loadM3Controller(action) {
    try {
        const list = yield call(loadM3, action.pyload);
        yield put(actions.queryCreator.setM3(list));
    } catch(err) {

    }
}

function loadM3(params) {
    return http.post('/combo/m3', params);
}

function* loadM4Controller(action) {
    try {
        const list = yield call(loadM4, action.pyload);
        yield put(actions.queryCreator.setM4(list));
    } catch(err) {

    }
}

function loadM4(params) {
    return http.post('/combo/m4', params);
}

function* doQueryController(action) {
    yield put(advanceSearchCreator.doQuery(action.payload));
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.LOAD_GROUP, loadGroupController);
    yield takeLatest(actions.LOAD_M1, loadM1Controller);
    yield takeLatest(actions.LOAD_M2, loadM2Controller);
    yield takeLatest(actions.LOAD_M3, loadM3Controller);
    yield takeLatest(actions.LOAD_M4, loadM4Controller);
}
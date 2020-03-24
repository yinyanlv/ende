import {takeLatest, all, call, put} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {rebuildListToOptions} from '@/common/utils';
import {insertModelOptions} from './reducer';
import * as actions from './actions';
import {advanceSearchCreator} from '../actions';

function* loadGroupController() {
    try {
        const list = yield call(loadGroup);
        yield put(actions.queryCreator.setGroup(list));
    } catch(err) {
        message.error(err.message);
    }
}

function loadGroup() {
    return http.get('/combo/legend/group');
}

function* loadM1Controller() {
    try {
        const list = yield call(loadM1);
        const options = rebuildListToOptions(list);
        yield put(actions.queryCreator.setM1(options));
    } catch(err) {
        message.error(err.message);
    }
}

function loadM1() {
    return http.get('/combo/m1');
}

function* loadM2Controller(action) {
    try {
        const list = yield call(loadM2, action.payload);
        const params = action.payload;
        const options = rebuildListToOptions(list, false, true);

        yield put(actions.queryCreator.setM2({
            path: [params.m1],
            list: options
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function loadM2(params) {
    return http.post('/combo/m2', params);
}

function* loadM3Controller(action) {
    try {
        const list = yield call(loadM3, action.payload);
        const params = action.payload;
        const options = rebuildListToOptions(list);

        yield put(actions.queryCreator.setM3({
            path: [params.m1, params.m2],
            list: options
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function loadM3(params) {
    return http.post('/combo/m3', params);
}

function* loadM4Controller(action) {
    try {
        const list = yield call(loadM4, action.payload);
        const params = action.payload;
        const options = rebuildListToOptions(list, true);

        yield put(actions.queryCreator.setM4({
            path: [params.m1, params.m2, params.m3],
            list: options
        }));
    } catch(err) {
        message.error(err.messsage);
    }
}

function loadM4(params) {
    return http.post('/combo/m4', params);
}

function* doQueryController(action) {
    try {
        yield put(advanceSearchCreator.doQuery(action.payload));
    } catch(err) {
        message.error(err.message);
    }
}

function* loadModelOptionsController(action) {
    const path = action.payload;

    try {
        const list = yield all([
            loadM1(),
            loadM2({
                m1: path[0]
            }),
            loadM3({
                m1: path[0],
                m2: path[1]
            }),
            loadM4({
                m1: path[0],
                m2: path[1],
                m3: path[2]
            })
        ]);
        let modelOptions = rebuildListToOptions(list[0]);

        insertModelOptions(modelOptions, 0, 0, null, path, rebuildListToOptions(list[1]));
        insertModelOptions(modelOptions, 1, 0, null, path, rebuildListToOptions(list[2]));
        insertModelOptions(modelOptions, 2, 0, null, path, rebuildListToOptions(list[3]));

        yield put(actions.queryCreator.setModelOptions(modelOptions));
    } catch(err) {
        message.error(err.message);
    }
}

function* validateVinController(action) {
    try{
        yield call(validateVin, action.payload);
        yield put(actions.queryCreator.setIsShowBtnDetail({
            isShowBtnDetail: true
        }));
    } catch (err) {
        yield put(actions.queryCreator.setIsShowBtnDetail({
            isShowBtnDetail: false
        }));
    }
}

function validateVin(params) {
    return http.post('/vin/detail', {
        code: params.code
    });
}

function* validateVsnController(action) {
    try{
        yield call(validateVsn, action.payload);
        yield put(actions.queryCreator.setIsShowBtnDetail({
            isShowBtnDetail: true
        }));
    } catch (err) {
        yield put(actions.queryCreator.setIsShowBtnDetail({
            isShowBtnDetail: false
        }));
    }
}

function validateVsn(params) {
    return http.post('/vsn/select', {
        code: params.code
    });
}

export function* querySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.LOAD_GROUP, loadGroupController);
    yield takeLatest(actions.LOAD_MODEL_OPTIONS, loadModelOptionsController);
    yield takeLatest(actions.LOAD_M1, loadM1Controller);
    yield takeLatest(actions.LOAD_M2, loadM2Controller);
    yield takeLatest(actions.LOAD_M3, loadM3Controller);
    yield takeLatest(actions.LOAD_M4, loadM4Controller);
    yield takeLatest(actions.VALIDATE_VIN, validateVinController);
    yield takeLatest(actions.VALIDATE_VSN, validateVsnController);
}

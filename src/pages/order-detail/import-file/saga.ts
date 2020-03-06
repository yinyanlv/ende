import {takeLatest, put, call} from 'redux-saga/effects';
import {API_PREFIX} from '@/config';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';

function* importFileController(action) {
    try {
        yield call(importFile, action.payload);
        yield put(actions.importFileCreator.setIsShow({
            isShow: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function importFile(params) {
    return http.post('/order/receiver/save', params);
}

function* downloadTplController() {
    try {
        window.open(API_PREFIX);
    } catch(err) {
        message.error(err.message);
    }
}

export function* importFileSaga() {
    yield takeLatest(actions.IMPORT_FILE, importFileController);
    yield takeLatest(actions.DOWNLOAD_TPL, downloadTplController);
}

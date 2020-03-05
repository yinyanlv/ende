import {takeLatest, put, call, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {API_PREFIX} from '@/config';
import * as actions from './actions';


function* uploadFileController(action) {
    try {
        yield put(actions.uploadCreator.setIsUploading({isUploading: true}));
        yield call(uploadFile, action.payload);
        yield put(actions.uploadCreator.setIsUploading({isUploading: false}));
    } catch(err) {
        yield put(actions.uploadCreator.setIsUploading({isUploading: false}));
        message.error(err.message);
    }
}

function uploadFile(params) {
    return http.post('/order/purchaser/save', params);
}

function* downloadTemplateController() {
    try {
        window.open(`${API_PREFIX}/download`);
    } catch(err) {
        message.error(err.message);
    }
}

export function* uploadSaga() {
    yield takeLatest(actions.DOWNLOAD_TEMPLATE, downloadTemplateController);
    yield takeLatest(actions.UPLOAD_FILE, uploadFileController);
}

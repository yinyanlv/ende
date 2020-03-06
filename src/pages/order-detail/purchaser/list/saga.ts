import {takeLatest, put, call, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadListController(action) {
    try {
        yield put(actions.listCreator.setIsLoading({isLoading: true}));
        const list = yield call(loadList);
        yield put(actions.listCreator.setList(list));
        yield put(actions.listCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        yield put(actions.listCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function loadList() {
    return http.get('/order/purchaser');
}

function* setDefaultController(action) {
    try {
        yield call(setDefault, action.payload);
        yield put(actions.listCreator.loadList());
    } catch(err) {
        message.error(err.message);
    }
}

function setDefault(params) {
    return http.post('/order/purchaser/default', {
        id: params.id
    });
}

function* deleteRecordController(action) {
    try{
        yield call(deleteRecord, action.payload);
        yield put(actions.listCreator.loadList());
    } catch(err) {
        message.error(err.message);
    }
}

function deleteRecord(params) {
    return http.post('/order/purchaser/remove', {
        id: params.id
    });
}

export function* listSaga() {
    yield takeLatest(actions.LOAD_LIST, loadListController);
    yield takeLatest(actions.SET_DEFAULT, setDefaultController);
    yield takeLatest(actions.DELETE_RECORD, deleteRecordController);
}

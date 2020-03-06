import {takeLatest, put, call, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {receiverCreator} from '../actions';

function* loadListController(action) {
    try {
        yield put(actions.listCreator.setIsLoading({isLoading: true}));
        const list = yield call(loadList);
        const selectedKeys = getSelectedKeys(list);
        yield put(actions.listCreator.setSelectedKeys(selectedKeys));
        yield put(actions.listCreator.setList(list));
        yield put(actions.listCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        yield put(actions.listCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function getSelectedKeys(list) {
    const result: any = [];
    if (!list) {
       return result;
    }
    list.forEach((item: any) => {
        if (item.default) {
            result.push(item.id);
        }
    });
    return result;
}

function loadList() {
    return http.get('/order/receiver');
}

function* setDefaultController(action) {
    try {
        yield call(setDefault, action.payload);
        const params = Object.assign({}, action.payload);
        yield put(receiverCreator.setInfo(params));
        yield put(actions.listCreator.setIsShowList({
           isShow: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function setDefault(params) {
    return http.post('/order/receiver/default', {
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
    return http.post('/order/receiver/remove', {
        id: params.id
    });
}

export function* listSaga() {
    yield takeLatest(actions.LOAD_LIST, loadListController);
    yield takeLatest(actions.SET_DEFAULT, setDefaultController);
    yield takeLatest(actions.DELETE_RECORD, deleteRecordController);
}

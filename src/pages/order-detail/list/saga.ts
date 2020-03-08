import {takeLatest, put, call, all, fork} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';
import {purchaserCreator} from '../purchaser/actions';
import {receiverCreator} from '../receiver/actions';

function* loadListController(action) {
    try {
        const type = action.payload.type;
        yield put(actions.listCreator.setIsLoading({isLoading: true}));
        const list = yield call(loadList, {type});
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

const LOAD_URL_MAP = {
    purchaser: '/order/purchaser',
    receiver: '/order/receiver'
};
function loadList(params) {
    const url = LOAD_URL_MAP[params.type];
    return http.get(url);
}

function* setDefaultController(action) {
    try {
        const type = action.payload.type;
        yield call(setDefault, action.payload);
        const params = Object.assign({}, action.payload);

        if (type === 'purchaser') {
            yield put(purchaserCreator.setInfo(params));
        } else {
            yield put(receiverCreator.setInfo(params));
        }

        yield put(actions.listCreator.setIsShowList({
           isShow: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

const SET_DEFAULT_URL_MAP = {
    purchaser: '/order/purchaser/default',
    receiver: '/order/receiver/default'
};
function setDefault(params) {
    const url = SET_DEFAULT_URL_MAP[params.type];

    return http.post(url, {
        id: params.id
    });
}

function* deleteRecordController(action) {
    try{
        const type = action.payload.type;
        yield call(deleteRecord, action.payload);
        yield put(actions.listCreator.loadList({
            type
        }));
    } catch(err) {
        message.error(err.message);
    }
}

const DELETE_URL_MAP = {
    purchaser: '/order/purchaser/remove',
    receiver: '/order/receiver/remove'
};
function deleteRecord(params) {
    const url = DELETE_URL_MAP[params.type];

    return http.post(url, {
        id: params.id
    });
}

export function* listSaga() {
    yield takeLatest(actions.LOAD_LIST, loadListController);
    yield takeLatest(actions.SET_DEFAULT, setDefaultController);
    yield takeLatest(actions.DELETE_RECORD, deleteRecordController);
}

import {put, call, all, fork, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import {buildQueryParams} from '@/common/utils';
import * as actions from './actions';
import {querySaga} from './query/saga';

function* doQueryController(action) {
    try {
        yield put(actions.collectCreator.setIsLoading({isLoading: true}));
        const data = yield call(doQuery, action.payload);
        yield put(actions.collectCreator.setCollect(data));
        yield put(actions.collectCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        yield put(actions.collectCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/cart/page', params);
}

function* addToCollectController(action) {
    try {
        yield call(addToCollect, action.payload);
        message.success('收藏成功');
    } catch(err) {
        message.error(err.message);
    }
}

function addToCollect(params) {
    return http.post('/cart/add', {
        partCode: params.partCode
    });
}

function* deleteFromCollectController(action) {
    try {
        yield call(deleteFromCollect, action.payload);
        yield put(actions.collectCreator.doQuery(buildQueryParams()));
        message.success('删除成功');
    } catch(err) {
        message.error(err.message);
    }
}

function deleteFromCollect(params) {
    return http.post('/cart/delete', {
        codes: params.codes
    });
}

function editItemController(action) {
    try {
        // const data = yield call(editItem, action.payload);
    } catch(err) {
        message.error(err.message);
    }
}

// function editItem(params) {
//     return http.post('/cart/update-qty', {
//         partCode: params.partCode,
//         qty: params.qty
//     });
// }

function* collectSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
    yield takeLatest(actions.ADD_TO_COLLECT, addToCollectController);
    yield takeLatest(actions.DELETE_FROM_COLLECT, deleteFromCollectController);
    yield takeLatest(actions.EDIT_ITEM, editItemController);
}

export function* collectSagas() {
    yield all([
        fork(querySaga),
        fork(collectSaga)
    ]);
}

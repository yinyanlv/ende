import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* doQueryController(action) {
    try {
        yield put(actions.partsCreator.setIsLoading({
            isLoading: true
        }));
        const data = yield call(doQuery, action.payload);
        yield put(actions.partsCreator.setParts(data));
        yield put(actions.partsCreator.setIsLoading({
            isLoading: false
        }));
    } catch(err) {
        yield put(actions.partsCreator.setIsLoading({
            isLoading: false
        }));
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/search/part/page', params);
}

export function* partsSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

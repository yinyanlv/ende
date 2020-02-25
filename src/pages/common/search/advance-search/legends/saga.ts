import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* doQueryController(action) {
    try {
        yield put(actions.legendsCreator.setIsLoading({
            isLoading: true
        }));
        const data = yield call(doQuery, action.payload);
        yield put(actions.legendsCreator.setLegends(data));
        yield put(actions.legendsCreator.setIsLoading({
            isLoading: false
        }));
    } catch (err) {
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/search/legend/page', params);
}

export function* legendsSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

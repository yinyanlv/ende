import {call, put, takeLatest} from 'redux-saga/effects';
import {message} from 'antd';
import {http} from '@/common/http';
import * as actions from './actions';

function* loadApplicationController(action) {
    try {
        yield put(actions.applicationCreator.setIsLoading({
            isLoading: true
        }));
        const params = action.payload;
        const list = yield call(loadApplication, params);
        yield put(actions.applicationCreator.setApplication(list));
        yield put(actions.applicationCreator.setIsLoading({
            isLoading: false
        }));
    } catch (err) {
        yield put(actions.applicationCreator.setIsLoading({
            isLoading: false
        }));
        message.error(err.message);
    }
}

function loadApplication(params) {
    return http.post('/usage/options', params);
}

export function* applicationSaga() {
    yield takeLatest(actions.LOAD_APPLICATION, loadApplicationController);
}


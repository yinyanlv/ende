import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadPartsController(action) {
    try {
        yield put(actions.printLegendCreator.setIsLoading({isLoading: true}));
        const list = yield call(loadParts, action.payload);
        yield put(actions.printLegendCreator.setParts(list));
        yield put(actions.printLegendCreator.setIsLoading({isLoading: false}));
    } catch(err) {
        console.log(err);
        yield put(actions.printLegendCreator.setIsLoading({isLoading: false}));
        message.error(err.message);
    }
}

function loadParts(params) {
    return http.post('/usage/parts', params);
}

export function* printLegendSaga() {
    yield takeLatest(actions.LOAD_PARTS, loadPartsController);
}

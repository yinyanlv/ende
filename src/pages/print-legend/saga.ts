import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadPartsController(action) {
    try {
        yield put(actions.printLegendCreator.setIsLoading({isLoading: true}));
        const result = yield call(loadParts, action.payload);
        yield put(actions.printLegendCreator.setParts(result.usages));
        yield put(actions.printLegendCreator.setIsLoading({isLoading: false}));
        setTimeout(() => {
           window.print();
        }, 1000);
    } catch(err) {
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

import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* doQueryController(action) {
    try {
        const data = yield call(doQuery, action.payload);
        yield put(actions.partsCreator.setParts(data));
    } catch(err) {

    }
}

function doQuery(params) {
    return http.post('/search/part/page', params);
}

export function* partsSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}
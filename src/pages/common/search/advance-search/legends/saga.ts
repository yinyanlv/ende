import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* doQueryController(action) {
    try {
        const data = yield call(doQuery, action.payload);
        yield put(actions.legendsCreator.setLegends(data));
    }catch(err) {

    }
}

function doQuery(params) {
    return http.post('/search/legend/page', params);
}

export function* legendsSaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}
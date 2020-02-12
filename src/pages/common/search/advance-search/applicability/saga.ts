import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* doQueryController(action) {
    const data = call(doQuery, action.payload);

    console.log(data);
    put(actions.applicabilityCreator.setApplicability(data));
}

function doQuery(params) {
    return http.post('/search/apply/page', params);
}

export function* applicabilitySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}
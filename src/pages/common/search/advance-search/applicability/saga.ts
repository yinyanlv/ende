import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {buildQueryParams} from '@/common/utils';
import {http} from '@/common/http';

function* applicabilityQueryController(action) {
    const data = call(applicabilityQuery, action.payload);

    put(actions.searchApplicabilityCreator.setApplicabilityList(data));
}

function applicabilityQuery(params) {
    const args = buildQueryParams(params);
    return http.post('/search/apply/page', args);
}

export function* searchApplicabilitySaga() {
    yield takeLatest(actions.SEARCH_APPLICABILITY_QUERY, applicabilityQueryController);
}
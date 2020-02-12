import {call, takeLatest, put} from 'redux-saga/effects';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadApplicabilityController(action) {
    const list = yield call(loadApplicability, action.payload);

    yield put(actions.applicabilityCreator.setApplicability(list));
}

function loadApplicability(partCode) {
    return http.post('/part/apply', {
        partCode
    });
}

export function* applicabilitySaga() {
    yield takeLatest(actions.LOAD_APPLICABILITY, loadApplicabilityController);
}
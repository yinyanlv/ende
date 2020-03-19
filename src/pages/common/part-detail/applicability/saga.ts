import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* loadApplicabilityController(action) {
    try {
        const list = yield call(loadApplicability, action.payload);
        yield put(actions.applicabilityCreator.setApplicability(list));
    } catch (err) {
        message.error(err.message);
    }
}

function loadApplicability(params) {
    return http.post('/part/apply', {
        partCode: params.partCode
    });
}

export function* applicabilitySaga() {
    yield takeLatest(actions.LOAD_APPLICABILITY, loadApplicabilityController);
}

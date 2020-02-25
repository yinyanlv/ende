import {call, takeLatest, put} from 'redux-saga/effects';
import {message} from 'antd';
import * as actions from './actions';
import {http} from '@/common/http';

function* doQueryController(action) {
    try {
        yield put(actions.applicabilityCreator.setIsLoading({
            isLoading: true
        }));
        const data = yield call(doQuery, action.payload);
        yield put(actions.applicabilityCreator.setApplicability(data));
        yield put(actions.applicabilityCreator.setIsLoading({
            isLoading: false
        }));
    } catch(err) {
        message.error(err.message);
    }
}

function doQuery(params) {
    return http.post('/search/apply/page', params);
}

export function* applicabilitySaga() {
    yield takeLatest(actions.DO_QUERY, doQueryController);
}

import {fork, all, put, call, takeLatest} from 'redux-saga/effects';
import * as actions from './actions';
import {partInfoSaga} from './part-info/saga';
import {applicabilitySaga} from './applicability/saga';
import {replaceSaga} from './replace/saga';
import {bulletinSaga} from './bulletin/saga';
import {http} from '@/common/http';

function* loadCountController(action) {
    const data = yield call(loadCount, action.payload);
    yield put(actions.partDetailCreator.setCount(data));
}

function loadCount(params) {
    return http.post('/bulletin/statics', params);
}

function* partDetailSaga() {
    yield takeLatest(actions.LOAD_COUNT, loadCountController);
}

export function* partDetailSagas() {
    yield all(
        [
            fork(partDetailSaga),
            fork(partInfoSaga),
            fork(applicabilitySaga),
            fork(replaceSaga),
            fork(bulletinSaga)
        ]
    );
}

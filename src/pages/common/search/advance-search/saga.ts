import {all, fork} from 'redux-saga/effects';
import {querySaga} from './query/saga';
import {applicabilitySaga} from './applicability/saga';

export function* advanceSearchSaga() {
    yield all([
            fork(querySaga),
            fork(applicabilitySaga)
        ]);
}

import {all, fork} from 'redux-saga/effects';
import * as actions from './actions';
import {searchApplicabilitySaga} from './applicability/saga';

export function* advanceSearchSaga() {
    yield all([
            fork(searchApplicabilitySaga)
        ]);
}

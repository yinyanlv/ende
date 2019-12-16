import {all, fork} from 'redux-saga/effects';
import {groupsSaga} from './groups/saga';
import {legendsSaga} from './legends/saga';
import {partsSaga} from './parts/saga';

export function* usageSaga() {
    yield all([
        fork(groupsSaga),
        fork(legendsSaga),
        fork(partsSaga)
    ]);
}


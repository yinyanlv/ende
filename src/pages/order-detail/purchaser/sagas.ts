import {all, fork} from 'redux-saga/effects';
import {listSaga} from './list/saga';

export function* purchaserSagas() {
    yield all([
        fork(listSaga),
    ]);
}

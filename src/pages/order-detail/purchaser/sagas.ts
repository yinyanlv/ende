import {all, fork} from 'redux-saga/effects';
import {listSaga} from './list/saga';
import {editSaga} from './edit/saga';

export function* purchaserSagas() {
    yield all([
        fork(listSaga),
        fork(editSaga)
    ]);
}

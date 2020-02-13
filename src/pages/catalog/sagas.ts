import {all, fork} from 'redux-saga/effects';
import {brandsSaga} from './brands/saga';
import {conditionsSaga} from './conditions/saga';

export function* catalogSagas() {
    yield all([
        fork(brandsSaga),
        fork(conditionsSaga)
    ]);
}

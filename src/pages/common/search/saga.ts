import {fork, all} from 'redux-saga/effects';
import {replaceSaga} from './replace/saga';

export function* searchSaga() {
    yield all(
        [
            fork(replaceSaga)
        ]
    );
}

import {fork, all} from 'redux-saga/effects';
import {advanceSearchSaga} from './advance-search/saga';
import {replaceSaga} from './replace/saga';

export function* searchSaga() {
    yield all(
        [
            fork(advanceSearchSaga),
            fork(replaceSaga)
        ]
    );
}

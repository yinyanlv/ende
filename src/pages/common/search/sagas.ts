import {fork, all} from 'redux-saga/effects';
import {advanceSearchSagas} from './advance-search/sagas';
import {replaceSaga} from './replace/saga';

export function* searchSagas() {
    yield all(
        [
            fork(advanceSearchSagas),
            fork(replaceSaga)
        ]
    );
}

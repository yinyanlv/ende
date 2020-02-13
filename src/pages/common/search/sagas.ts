import {fork, all} from 'redux-saga/effects';
import {advanceSearchSagas} from './advance-search/sagas';
import {replaceSagas} from './replace/sagas';

export function* searchSagas() {
    yield all(
        [
            fork(advanceSearchSagas),
            fork(replaceSagas)
        ]
    );
}

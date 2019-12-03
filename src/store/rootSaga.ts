import {all, fork} from 'redux-saga/effects';
import {catalogSaga} from '@/pages/catalog/saga';

export function* rootSaga() {
    yield all([
        fork(catalogSaga)
    ]);
}

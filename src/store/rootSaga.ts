import {all, fork} from 'redux-saga/effects';
import {crumbsSaga} from '@/pages/common/crumbs/saga';
import {catalogSaga} from '@/pages/catalog/saga';
import {usageSaga} from '@/pages/usage/saga';

export function* rootSaga() {
    yield all([
        fork(crumbsSaga),
        fork(catalogSaga),
        fork(usageSaga)
    ]);
}
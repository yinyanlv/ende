import {all, fork} from 'redux-saga/effects';
import {crumbsSaga} from '@/pages/common/crumbs/saga';
import {vinSearchSaga} from '@/pages/common/vin-search/saga';
import {searchSaga} from '@/pages/common/search/saga';
import {catalogSaga} from '@/pages/catalog/saga';
import {usageSaga} from '@/pages/usage/saga';

export function* rootSaga() {
    yield all([
        fork(crumbsSaga),
        fork(vinSearchSaga),
        fork(searchSaga),
        fork(catalogSaga),
        fork(usageSaga)
    ]);
}

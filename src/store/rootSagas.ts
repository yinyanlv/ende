import {all, fork} from 'redux-saga/effects';
import {crumbsSaga} from '@/pages/common/crumbs/saga';
import {vinSearchSaga} from '@/pages/common/vin-search/saga';
import {searchSagas} from '@/pages/common/search/sagas';
import {catalogSaga} from '@/pages/catalog/saga';
import {usageSaga} from '@/pages/usage/saga';

export function* rootSagas() {
    yield all([
        fork(crumbsSaga),
        fork(vinSearchSaga),
        fork(searchSagas),
        fork(catalogSaga),
        fork(usageSaga)
    ]);
}

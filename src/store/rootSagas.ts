import {all, fork} from 'redux-saga/effects';
import {crumbsSaga} from '@/pages/common/crumbs/saga';
import {vinSearchSaga} from '@/pages/common/vin-search/saga';
import {searchSagas} from '@/pages/common/search/sagas';
import {shoppingCartSagas} from '@/pages/common/shopping-cart/sagas';
import {partDetailSagas} from '@/pages/common/part-detail/sagas';
import {catalogSagas} from '@/pages/catalog/sagas';
import {usageSagas} from '@/pages/usage/sagas';

export function* rootSagas() {
    yield all([
        fork(crumbsSaga),
        fork(vinSearchSaga),
        fork(searchSagas),
        fork(shoppingCartSagas),
        fork(partDetailSagas),
        fork(catalogSagas),
        fork(usageSagas)
    ]);
}

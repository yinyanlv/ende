import {all, fork} from 'redux-saga/effects';
import {navSaga} from '@/pages/common/header/nav/saga';
import {crumbsSaga} from '@/pages/common/crumbs/saga';
import {vinSearchSaga} from '@/pages/common/vin-search/saga';
import {searchSagas} from '@/pages/common/search/sagas';
import {shoppingCartSagas} from '@/pages/common/shopping-cart/sagas';
import {partDetailSagas} from '@/pages/common/part-detail/sagas';
import {catalogSagas} from '@/pages/catalog/sagas';
import {usageSagas} from '@/pages/usage/sagas';
import {ordersSagas} from '@/pages/orders/sagas';

export function* rootSagas() {
    yield all([
        fork(navSaga),
        fork(crumbsSaga),
        fork(vinSearchSaga),
        fork(searchSagas),
        fork(shoppingCartSagas),
        fork(partDetailSagas),
        fork(catalogSagas),
        fork(usageSagas),
        fork(ordersSagas)
    ]);
}

import {all, fork} from 'redux-saga/effects';
import {navSaga} from '@/pages/common/header/nav/saga';
import {crumbsSaga} from '@/pages/common/crumbs/saga';
import {vinSearchSaga} from '@/pages/common/vin-search/saga';
import {searchSagas} from '@/pages/common/search/sagas';
import {shoppingCartSagas} from '@/pages/common/shopping-cart/sagas';
import {partDetailSagas} from '@/pages/common/part-detail/sagas';
import {collectSagas} from '@/pages/common/collect/sagas';
import {catalogSagas} from '@/pages/catalog/sagas';
import {usageSagas} from '@/pages/usage/sagas';
import {ordersSagas} from '@/pages/orders/sagas';
import {orderDetailSagas} from '@/pages/order-detail/sagas';
import {printLegendSaga} from '@/pages/print-legend/saga';

export function* sagas() {
    yield all([
        fork(navSaga),
        fork(crumbsSaga),
        fork(vinSearchSaga),
        fork(searchSagas),
        fork(shoppingCartSagas),
        fork(partDetailSagas),
        fork(collectSagas),
        fork(catalogSagas),
        fork(usageSagas),
        fork(ordersSagas),
        fork(orderDetailSagas),
        fork(printLegendSaga)
    ]);
}

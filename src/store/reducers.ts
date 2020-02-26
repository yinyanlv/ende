import {combineReducers} from 'redux';
import {configReducer} from './config/reducer';
import {navReducer} from '@/pages/common/header/nav/reducer';
import {vinSearchReducer} from '@/pages/common/vin-search/reducer';
import {vsnSelectorReducer} from '@/pages/common/vsn-selector/reducer';
import {vinDetailReducer} from '@/pages/common/vin-detail/reducer';
import {searchReducers} from '@/pages/common/search/reducers';
import {shoppingCartReducers} from '@/pages/common/shopping-cart/reducers';
import {partDetailReducers} from '@/pages/common/part-detail/reducers';
import {crumbsReducer} from '@/pages/common/crumbs/reducer';
import {brandsReducer} from '@/pages/catalog/brands/reducer';
import {conditionsReducer} from '@/pages/catalog/conditions/reducer';
import {usageReducer} from '@/pages/usage/reducer';
import {groupsReducer} from '@/pages/usage/groups/reducer';
import {legendsReducer} from '@/pages/usage/legends/reducer';
import {legendReducer} from '@/pages/usage/legend/reducer';
import {partsReducer} from '@/pages/usage/parts/reducer';
import {ordersReducers} from '@/pages/orders/reducers';

export const reducers = combineReducers({
    config: configReducer,
    nav: navReducer,
    vinSearch: vinSearchReducer,
    vsnSelector: vsnSelectorReducer,
    vinDetail: vinDetailReducer,
    search: searchReducers,
    shoppingCart: shoppingCartReducers,
    partDetail: partDetailReducers,
    crumbs: crumbsReducer,
    brands: brandsReducer,
    conditions: conditionsReducer,
    usage: usageReducer,
    groups: groupsReducer,
    legends: legendsReducer,
    legend: legendReducer,
    parts: partsReducer,
    orders: ordersReducers
});

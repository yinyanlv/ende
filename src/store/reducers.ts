import {combineReducers} from 'redux';
import {authReducer} from '@/pages/common/auth/reducer';
import {crumbsReducer} from '@/pages/common/crumbs/reducer';
import {brandsReducer} from '@/pages/catalog/brands/reducer';
import {conditionsReducer} from '@/pages/catalog/conditions/reducer';
import {usageReducer} from '@/pages/usage/reducer';
import {groupsReducer} from '@/pages/usage/groups/reducer';
import {legendReducer} from '@/pages/usage/legend/reducer';

export const reducers = combineReducers({
    auth: authReducer,
    crumbs: crumbsReducer,
    brands: brandsReducer,
    conditions: conditionsReducer,
    usage: usageReducer,
    groups: groupsReducer,
    legend: legendReducer
});

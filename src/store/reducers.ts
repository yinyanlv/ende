import {combineReducers} from 'redux';
import {configReducer} from './config/reducer';
import {crumbsReducer} from '@/pages/common/crumbs/reducer';
import {brandsReducer} from '@/pages/catalog/brands/reducer';
import {conditionsReducer} from '@/pages/catalog/conditions/reducer';
import {usageReducer} from '@/pages/usage/reducer';
import {groupsReducer} from '@/pages/usage/groups/reducer';
import {legendsReducer} from '@/pages/usage/legends/reducer';
import {legendReducer} from '@/pages/usage/legend/reducer';
import {partsReducer} from '@/pages/usage/parts/reducer';

export const reducers = combineReducers({
    config: configReducer,
    crumbs: crumbsReducer,
    brands: brandsReducer,
    conditions: conditionsReducer,
    usage: usageReducer,
    groups: groupsReducer,
    legends: legendsReducer,
    legend: legendReducer,
    parts: partsReducer
});

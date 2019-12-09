import {combineReducers} from 'redux';
import {authReducer} from '@/pages/common/auth/reducer';
import {crumbsReducer} from '@/pages/common/crumbs/reducer';
import {catalogReducer} from '@/pages/catalog/reducer';
import {usageReducer} from '@/pages/usage/reducer';

export const reducers = combineReducers({
    auth: authReducer,
    crumbs: crumbsReducer,
    catalog: catalogReducer,
    usage: usageReducer
});

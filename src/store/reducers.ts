import {combineReducers} from 'redux';
import {authReducer} from '@/pages/common/auth/reducer';
import {crumbsReducer} from '@/pages/common/crumbs/reducer';
import {catalogReducer} from '@/pages/catalog/reducer';

export const reducers = combineReducers({
    auth: authReducer,
    crumbs: crumbsReducer,
    catalog: catalogReducer
});

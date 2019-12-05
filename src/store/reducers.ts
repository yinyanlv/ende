import {combineReducers} from 'redux';
import {authReducer} from '@/pages/common/auth/reducer';
import {catalogReducer} from '@/pages/catalog/reducer';

export const reducers = combineReducers({
    auth: authReducer,
    catalog: catalogReducer
});

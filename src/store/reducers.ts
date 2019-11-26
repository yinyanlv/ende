import {combineReducers} from 'redux';
import {catalogReducer} from '@/pages/Catalog/reducer';

export const reducers = combineReducers({
    catalog: catalogReducer
});

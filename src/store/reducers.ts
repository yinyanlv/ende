import {combineReducers} from 'redux';
import {catalogReducer} from '@/pages/catalog/reducer';

export const reducers = combineReducers({
    catalog: catalogReducer
});

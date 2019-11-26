import {combineReducers} from 'redux';
import {homeReducer} from '@/pages/Home/reducer';

export const reducers = combineReducers({
    homeState: homeReducer
});

import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducers} from './reducers';
import {rootSaga} from './rootSaga';

const composeEnhancer =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true
    }) : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancer(applyMiddleware(sagaMiddleware));
const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
